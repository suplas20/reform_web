import { ArrowIcon } from "./Icons";
import { useToast } from "./Toast";

export function CopyLinkButton() {
  const showToast = useToast();
  async function copyLink() {
    try {
      await navigator.clipboard.writeText(window.location.href);
      showToast("페이지 주소를 복사했습니다.");
    } catch {
      showToast("주소창에서 페이지 주소를 복사해 주세요.");
    }
  }
  return (
    <button className="btn btn-outline btn-sm" type="button" onClick={copyLink}>
      링크 복사 <ArrowIcon size={15} />
    </button>
  );
}
