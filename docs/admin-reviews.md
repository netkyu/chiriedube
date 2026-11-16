# Admin recenzii (Supabase)

Proiect: `chiriedube` (`tdripjthqktwoaoubmoe`)

## Variabile pe Vercel

Adaugă aceleași chei ca în `.env.local`:

- `NEXT_PUBLIC_SUPABASE_URL`
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`

## Acces

- URL: `/admin/login`
- Cont: vezi mesajul din chat (nu stoca parola în git)

## Flux

1. Clientul trimite recenzie pe landing (`#recenzii`) → status `pending`
2. Admin aprobă / respinge / editează / șterge în `/admin/reviews`
3. Conturi admin noi + schimbare parolă în `/admin/account`
