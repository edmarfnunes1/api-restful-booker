# 🧪 API Restful Booker – Testes Automatizados com Cypress

Projeto de testes automatizados de API usando **Cypress (v13+)**, validando a API pública **Restful-Booker**.  
A ideia é manter uma automação **enxuta, organizada e escalável**


## 🔗 Relatório Allure (GitHub Pages)
A cada push na branch `main`, o pipeline executa os testes, gera o relatório e publica no Pages:

➡️ **Allure Report:** https://edmarfnunes1.github.io/api-restful-booker/


## ✅ O que já está implementado

### 🔐 POST /auth – Geração de Token
Cobertura atual:

- ✅ Gera token com credenciais válidas
- ✅ Não autentica com senha incorreta
- ✅ Não autentica com usuário incorreto
- ✅ Não autentica com payload vazio
- ✅ Não autentica sem `username`
- ✅ Não autentica sem `password`


## 🧰 Tecnologias e Ferramentas
- **Cypress** (API Testing)
- **Node.js**
- **Allure Reports** (geração e publicação via CI)
- **GitHub Actions** (pipeline CI/CD)
- **AJV** (validação de contrato – preparado para uso)
- **@faker-js/faker** (massa dinâmica nos cenários negativos)

