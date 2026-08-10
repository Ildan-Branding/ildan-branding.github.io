import { createClient } from "@supabase/supabase-js";

const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

/**
 * 빌드 시 env가 비어있으면(로컬 초기 세팅 전 등) null을 내보낸다.
 * 호출부는 null 체크로 "설정 전" 상태를 다뤄야 한다.
 */
export const supabase = url && anonKey ? createClient(url, anonKey) : null;
