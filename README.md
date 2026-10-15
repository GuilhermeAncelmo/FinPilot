# FinPilot

Aplicação de gestão financeira pessoal em desenvolvimento. Reúne transações, metas e um painel para visualizar receitas e despesas.

## Stack atual

- Frontend: React, TypeScript, Vite e Tailwind CSS
- Backend: Node.js, Express, TypeScript e Prisma
- Banco de dados configurado no código: SQLite

## O que o código demonstra

- API para consultar dados do painel e cadastrar transações
- Cálculos de receitas e despesas a partir das transações
- Interface com páginas de painel, receitas, despesas, metas e planejamento

## Estado do projeto

O projeto está em desenvolvimento. Algumas telas apresentam exemplos estáticos. A página de insights usa textos e valores definidos no frontend; ainda não há integração de IA nessa funcionalidade. O schema Prisma atual usa SQLite, embora PostgreSQL possa ser considerado futuramente.

## Próximos passos

- Conectar as telas restantes aos dados persistidos
- Documentar a configuração e execução ponta a ponta
- Adicionar testes para os cálculos financeiros e a API
- Implementar insights baseados em dados reais antes de apresentá-los como IA
