import { Component, inject, input, signal } from '@angular/core';
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
export class ContactSection {
  private readonly http = inject(HttpClient);
  private readonly document = inject(DOCUMENT);

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

    const captchaToken =
      this.document.querySelector<HTMLTextAreaElement>('[name="h-captcha-response"]')?.value ?? '';

    if (!captchaToken) {
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
      'h-captcha-response': captchaToken,
    };

    this.http.post<{ success: boolean; message: string }>(this.formConfig.endpoint, payload).subscribe({
      next: (response) => {
        if (response.success) {
          this.submitSuccess.set('Message sent successfully. I will get back to you soon.');
          this.formModel.name = '';
          this.formModel.email = '';
          this.formModel.message = '';
          (window as { hcaptcha?: { reset: () => void } }).hcaptcha?.reset();
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
}
