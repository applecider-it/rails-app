# 開発者向けページ
class DevelopmentController < ApplicationController
  before_action :authenticate_user!, only: [:ruby_test]

  def index
  end

  # Ruby動作確認
  def ruby_test
    sample_service = SampleServices::SampleService.new
    sample_service.test_exec("ruby_test")

    user = current_user

    p('user', user)
    p('user.to_json', user.to_json)
    p('user.as_json', user.as_json)
    p('user.as_json(include: :user_tweets)', user.as_json(include: :user_tweets))

    tweet = user.user_tweets.first

    if tweet
      p('tweet', tweet)
      p('tweet.to_json(include: :user)', tweet.to_json(include: :user))
      p('tweet.as_json(include: :user)', tweet.as_json(include: :user))
    end

    memory_mb = `ps -o rss= -p #{Process.pid}`.to_i / 1024.0
    Rails.logger.info "使用メモリ: #{memory_mb.round(2)} MB"

    render :complate
  end

  # View動作確認
  def view_test
    setup_form_data
  end

  # View動作確認（post処理）
  def view_test_post
    setup_form_data
    @form = ViewTestForm.new

    @form.assign_attributes(view_test_params)

    render :view_test
  end

  # テスト用フォームデータのセットアップ
  private def setup_form_data
    form_service = DevelopmentServices::FormService.new
    ret = form_service.form_data

    @form = ret[:form]
    @list_vals = ret[:list_vals]
    @radio_vals = ret[:radio_vals]
    @address_form = AddressForm.new
  end

  # Javascript動作確認
  def javascript_test
    setup_form_data
    @name = "Test!!"
  end

  # respond_to動作確認
  def respond_to_test
    respond_to do |format|
      format.html { render plain: "Test" }
      format.json { render json: {status: true} }
    end
  end

  # メディア動作確認
  def media_test
  end

  # エディター動作確認
  def editor_test
    @val = '<h1>見出し</h1>
<p>こんにちは！<strong>リッチテキストエディタ</strong>へようあこそ。</p>
<ol>
  <li><p>箇条書き１</p></li>
  <li><p>箇条書き２</p></li>
</ol>
<p></p>'
  end

  # 地図動作確認
  def map_test
  end

  # アップロードテスト
  def upload_test
    uploaded_file = params[:attachment]
    
    file_name = uploaded_file.original_filename
    file_content = uploaded_file.read
    
    File.open(Rails.root.join('tmp', 'upload_test___' + file_name), 'wb') do |file|
      file.write(file_content)
    end

    redirect_to development_view_test_path, notice: "アップロードが完了しました！"
  end

  # HTMXからの送信
  def htmx_post
    # 送信中の動作確認用
    sleep 3

    search = params[:search]
    category = params[:category]
    render partial: 'htmx_post', locals: { search: search, category: category }
  end

  private def view_test_params
    params.expect(view_test_form: [ :list_val, :radio_val, :datetime_val ])
  end
end
