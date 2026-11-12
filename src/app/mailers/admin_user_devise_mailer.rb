class AdminUserDeviseMailer < Devise::Mailer
  layout "mailer"
  def headers_for(action, opts)
    super.merge!(template_path: 'admin/admin_users/mailer')
  end
end