import { AfterViewInit, Component, ElementRef, OnDestroy, ViewChild, inject, input, signal } from '@angular/core';
import { CommonModule, DOCUMENT } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';

import { CONTACT_FORM_CONFIG } from '../../config/contact-form-config.generated';
import { RevealOnScrollDirective } from '../../directives/reveal-on-scroll';
import { Profile } from '../../models/portfolio';

@Component({
  selector: 'app-contact-section',
  imports: [CommonModule, FormsModule, RevealOnScrollDirective],
  templateUrl: './contact-section.html',
  styleUrl: './contact-section.scss',
})
export class ContactSection implements AfterViewInit, OnDestroy {
  private readonly http = inject(HttpClient);
  private readonly document = inject(DOCUMENT);
  private captchaRendered = false;
  private captchaToken = '';
  private scriptElement?: HTMLScriptElement;
  private captchaTheme: 'light' | 'dark' = 'light';
  private themeObserver?: MutationObserver;

  @ViewChild('captchaContainer') protected captchaContainer?: ElementRef<HTMLDivElement>;

  readonly profile = input.required<Profile>();

  protected readonly formConfig = CONTACT_FORM_CONFIG;
  protected readonly isSubmitting = signal(false);
  protected readonly submitSuccess = signal('');
  protected readonly submitError = signal('');

  protected readonly formModel = {
    name: '',
    email: '',
    message: '',
    botcheck: '',
  };

  ngAfterViewInit(): void {
    this.captchaTheme = this.getCaptchaTheme();
    this.observeThemeChanges();
    this.ensureCaptchaScript();
  }

  ngOnDestroy(): void {
    (window as WindowWithHCaptcha).onPortfolioCaptchaLoad = undefined;
    this.themeObserver?.disconnect();
  }

  protected submitContactForm(): void {
    this.submitSuccess.set('');
    this.submitError.set('');

    if (this.formConfig.accessKey === 'REPLACE_WITH_YOUR_WEB3FORMS_ACCESS_KEY') {
      this.submitError.set('Add your Web3Forms access key through the NG_APP_WEB3FORMS_ACCESS_KEY environment variable to enable live messages.');
      return;
    }

    if (this.formModel.botcheck) {
      return;
    }

    if (!this.captchaToken) {
      this.submitError.set('Please complete the captcha before sending your message.');
      return;
    }

    this.isSubmitting.set(true);

    const payload = {
      access_key: this.formConfig.accessKey,
      subject: this.formConfig.subject,
      from_name: this.formConfig.fromName,
      name: this.formModel.name,
      email: this.formModel.email,
      message: this.formModel.message,
      botcheck: '',
      'h-captcha-response': this.captchaToken,
    };

    this.http.post<{ success: boolean; message: string }>(this.formConfig.endpoint, payload).subscribe({
      next: (response) => {
        if (response.success) {
          this.submitSuccess.set('Message sent successfully. I will get back to you soon.');
          this.formModel.name = '';
          this.formModel.email = '';
          this.formModel.message = '';
          this.captchaToken = '';
          (window as WindowWithHCaptcha).hcaptcha?.reset();
        } else {
          this.submitError.set(response.message || 'Something went wrong while sending your message.');
        }
        this.isSubmitting.set(false);
      },
      error: () => {
        this.submitError.set('Unable to send the message right now. Please try again in a moment.');
        this.isSubmitting.set(false);
      },
    });
  }

  private ensureCaptchaScript(): void {
    const win = window as WindowWithHCaptcha;

    if (win.hcaptcha) {
      this.renderCaptcha();
      return;
    }

    win.onPortfolioCaptchaLoad = () => this.renderCaptcha();

    if (this.document.querySelector('script[data-hcaptcha-script="true"]')) {
      return;
    }

    this.scriptElement = this.document.createElement('script');
    this.scriptElement.src = 'https://js.hcaptcha.com/1/api.js?onload=onPortfolioCaptchaLoad&render=explicit';
    this.scriptElement.async = true;
    this.scriptElement.defer = true;
    this.scriptElement.setAttribute('data-hcaptcha-script', 'true');
    this.document.body.appendChild(this.scriptElement);
  }

  private renderCaptcha(): void {
    const win = window as WindowWithHCaptcha;
    const element = this.captchaContainer?.nativeElement;

    if (!win.hcaptcha || !element || this.captchaRendered) {
      return;
    }

    this.captchaTheme = this.getCaptchaTheme();

    win.hcaptcha.render(element, {
      sitekey: '50b2fe65-b00b-4b9e-ad62-3ba471098be2',
      theme: this.captchaTheme,
      callback: (token: string) => {
        this.captchaToken = token;
        this.submitError.set('');
      },
      'expired-callback': () => {
        this.captchaToken = '';
      },
      'error-callback': () => {
        this.captchaToken = '';
        this.submitError.set('Captcha failed to load. Please refresh the page and try again.');
      },
    });

    this.captchaRendered = true;
  }

  private observeThemeChanges(): void {
    this.themeObserver = new MutationObserver(() => {
      const nextTheme = this.getCaptchaTheme();

      if (nextTheme !== this.captchaTheme) {
        this.rerenderCaptcha(nextTheme);
      }
    });

    this.themeObserver.observe(this.document.documentElement, {
      attributes: true,
      attributeFilter: ['data-theme'],
    });
  }

  private rerenderCaptcha(nextTheme: 'light' | 'dark'): void {
    const element = this.captchaContainer?.nativeElement;
    const win = window as WindowWithHCaptcha;

    if (!element || !win.hcaptcha) {
      this.captchaTheme = nextTheme;
      return;
    }

    this.captchaTheme = nextTheme;
    this.captchaToken = '';
    this.captchaRendered = false;
    element.innerHTML = '';
    win.hcaptcha.reset();
    this.renderCaptcha();
  }

  private getCaptchaTheme(): 'light' | 'dark' {
    return this.document.documentElement.getAttribute('data-theme') === 'dark' ? 'dark' : 'light';
  }
}

interface WindowWithHCaptcha extends Window {
  hcaptcha?: {
    render: (
      container: HTMLElement,
      options: {
        sitekey: string;
        theme: 'light' | 'dark';
        callback: (token: string) => void;
        'expired-callback': () => void;
        'error-callback': () => void;
      }
    ) => void;
    reset: () => void;
  };
  onPortfolioCaptchaLoad?: () => void;
}
