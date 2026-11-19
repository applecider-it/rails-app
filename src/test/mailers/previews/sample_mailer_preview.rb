# Preview all emails at http://localhost:3000/rails/mailers/sample_mailer
class SampleMailerPreview < ActionMailer::Preview
  # Preview this email at http://localhost:3000/rails/mailers/sample_mailer/sample_mail
  def sample_mail
    SampleMailer.sample_mail
  end
end
