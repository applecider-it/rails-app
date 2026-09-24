# サンプルサービス
class SampleServices::SampleService
  def initialize
    @sub_service = SubService.new
  end

  # サンプルメソッド
  def test_exec(val)
    user = User.find(1)
    p(user)
    @sub_service.sub_exec(val)
  end
end
