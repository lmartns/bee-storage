export interface SupabaseConfig {
  url: string;
  anonKey: string;
}

export const config: SupabaseConfig = {
  url: process.env.NEXT_PUBLIC_SUPABASE_URL || "",
  anonKey: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "",
};

if (!config.url || !config.anonKey) {
  console.error(
    "ERRO: Variáveis de ambiente SUPABASE_URL e SUPABASE_ANON_KEY não estão definidas!",
  );
}
