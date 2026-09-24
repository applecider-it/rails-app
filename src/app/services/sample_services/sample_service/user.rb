# サンプルサービスのサブクラス
# 問題が発生しやすい実装例
class SampleServices::SampleService::User
  # サンプルメソッド
  def self.find(id)
    {
      id: id,
      name: 'ダミー',
    }
  end
end
