import { useToast } from "./Toast";

export function StoreButtons() {
  const showToast = useToast();
  const announceRelease = () =>
    showToast("앱 출시 후 스토어 다운로드 링크가 연결됩니다.");
  return (
    <div className="hero-stores" aria-label="앱 다운로드">
      <button
        type="button"
        className="store-badge"
        onClick={announceRelease}
        aria-label="App Store 다운로드 - 출시 준비 중"
      >
        <span className="store-symbol" aria-hidden="true">
          ●
        </span>
        <span>
          <small>iPhone 앱</small>
          <strong>App Store</strong>
        </span>
      </button>
      <button
        type="button"
        className="store-badge"
        onClick={announceRelease}
        aria-label="Google Play 다운로드 - 출시 준비 중"
      >
        <span className="play-icon" aria-hidden="true" />
        <span>
          <small>Android 앱</small>
          <strong>Google Play</strong>
        </span>
      </button>
    </div>
  );
}
