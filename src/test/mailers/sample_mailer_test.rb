require "test_helper"

class SampleMailerTest < ActionMailer::TestCase
  setup do
    @user = users(:one)
  end

  test "sample_mail" do
    mail = SampleMailer.sample_mail(@user)
    assert_equal "サンプルメール", mail.subject
    assert_equal [ "test1@example.com" ], mail.to
    assert_equal [ "from@example.com" ], mail.from
    assert_match "Hi", mail.body.encoded
  end
end
