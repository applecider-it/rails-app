class SampleMailer < ApplicationMailer
  # Subject can be set in your I18n file at config/locales/en.yml
  # with the following lookup:
  #
  #   en.sample_mailer.sample_mail.subject
  #
  def sample_mail(user)
    @greeting = "Hi"
    @user = user

    mail to: @user.email
  end
end
