# 📡 API Status Dashboard

Um dashboard moderno e responsivo para monitoramento em tempo real do status de APIs. Desenvolvido com React e Tailwind CSS, oferece uma interface intuitiva para acompanhar a saúde de múltiplos endpoints.

## ✨ Funcionalidades

### 🔍 **Monitoramento Automático**
- ✅ Verificação automática de status a cada 99 segundos
- 🔄 Tentativa dupla de requisição (GET e POST) para maior confiabilidade
- ⏱️ Contador visual mostrando próxima atualização
- 🎯 Tratamento específico para erro 500 (Internal Server Error)

### 📊 **Indicadores Visuais**
- 🟢 **Online** - API funcionando perfeitamente (status 200-299)
- 🟡 **Erro** - API respondendo com problemas (status 400-599, incluindo 500)
- 🔴 **Offline** - API não respondendo ou inacessível

### 📋 **Interface de Tabela**
- 📊 Tabela organizada com bordas visíveis
- ↗️ Alinhamento à direita para melhor legibilidade
- 🔍 Exibição de código de status HTTP
- 🎨 Design responsivo para desktop e mobile
- ⚡ Efeitos hover para melhor interatividade

### ➕ **Gerenciamento Dinâmico de APIs**
- 🆕 Adicionar novas APIs via modal intuitivo
- 🗑️ Remover APIs adicionadas pelo usuário
- 🔒 Proteção das APIs pré-configuradas
- 📝 Validação de campos obrigatórios

### 🎭 **Modal Avançado**
- 🖱️ Fechar clicando fora do modal
- ❌ Botão de fechar no canto superior
- 📱 Layout responsivo
- ⌨️ Validação em tempo real

### 🎨 **Loading e Feedback Visual**
- 🔄 GIF animado durante carregamento
- ⏳ Indicador de progresso
- 🎯 Feedback visual claro para todas as ações

## 🛠️ Tecnologias Utilizadas

- **React** - Biblioteca para interface de usuário
- **Tailwind CSS** - Framework CSS utilitário
- **Vite** - Build tool moderna e rápida
- **JavaScript ES6+** - Linguagem de programação

## 🚀 Como Executar

### Pré-requisitos
- Node.js (versão 14 ou superior)
- npm ou yarn

### Instalação
```bash
# Clone o repositório
git clone <url-do-repositorio>

# Navegue até o diretório
cd statusApi

# Instale as dependências
npm install

# Execute o projeto
npm run dev
```

### Build para Produção
```bash
# Gera build otimizado
npm run build

# Preview do build
npm run preview
```

## 📋 APIs Pré-configuradas

O dashboard vem com as seguintes APIs pré-configuradas:

- **WS Agent Command** - Controle de comandos do agente
- **WS Agent Config** - Configuração do agente
- **WS Agent Event** - Eventos do agente
- **WS Mailing Command** - Comandos de email
- **WS Integration** - Serviços de integração
- **WS Integration Origin** - Integração origem
- **WS Integration Command API** - API de comandos de integração
- **WS Eaglle** - Serviço Eaglle
- **WS MCX** - Serviço MCX
- **Recording Retrieve** - Recuperação de gravações
- **WebAPI Recording Retrieve** - API de gravações
- **WS Voice Support** - Suporte de voz
- **WS Eaglle CS Service** - Serviço CS Eaglle
- **Eaglle Service API** - API do serviço Eaglle
- **WS SoftPhone** - Softphone
- **WS Agent Cloud** - Agente na nuvem
- **WebApiChanneling** - API de canalização

## 🎯 Como Usar

### Visualizar Status
1. O dashboard carrega automaticamente ao abrir
2. Observe os indicadores coloridos para status rápido
3. Verifique códigos HTTP na coluna "Código"
4. Acompanhe o countdown para próxima atualização

### Adicionar Nova API
1. Clique no botão "➕ Adicionar API"
2. Preencha o nome da API
3. Insira a URL completa
4. Clique em "Adicionar" ou "Cancelar"

### Remover API
1. Localize a API adicionada por você (tem ícone 🗑️)
2. Clique no ícone da lixeira
3. A API será removida imediatamente

## 🔧 Configuração

### Alternar Intervalo de Atualização
Edite o arquivo `ApiStatusDashboard.jsx` na linha:
```javascript
const interval = setInterval(checkApis, 99000); // 99 segundos
```

### Modificar APIs Pré-configuradas
Edite o array `initialApis` no arquivo `ApiStatusDashboard.jsx`:
```javascript
const initialApis = [
  { name: "Sua API", url: "https://sua-api.com" },
  // ... outras APIs
];
```

## 🎨 Customização

### Cores dos Status
Edite a função `getStatusColor` para alterar as cores:
```javascript
const getStatusColor = (status) => {
  switch (status) {
    case "online": return "bg-green-500";   // Verde
    case "error": return "bg-yellow-500";   // Amarelo
    case "offline": return "bg-red-500";    // Vermelho
  }
};
```

### Tema Visual
O projeto usa Tailwind CSS. Modifique as classes CSS conforme necessário:
- `bg-gray-900` - Fundo principal
- `bg-gray-800` - Fundo dos cards
- `text-white` - Texto principal

## 📱 Responsividade

O dashboard é totalmente responsivo e funciona em:
- 💻 Desktop (1200px+)
- 📱 Tablet (768px - 1199px)
- 📱 Mobile (320px - 767px)

## 🔒 Tratamento de Erros

- **Erro 500** - Tratado como "erro" (não offline)
- **Timeout** - Marcado como "offline"
- **CORS** - Tratado automaticamente
- **Rede** - Fallback para POST se GET falhar

## 🚀 Melhorias Futuras

- [ ] Persistência local das APIs adicionadas
- [ ] Histórico de status
- [ ] Notificações em tempo real
- [ ] Exportação de relatórios
- [ ] Configuração de alertas
- [ ] Modo escuro/claro
- [ ] Filtros por status
- [ ] Busca por nome/URL

## 🤝 Contribuição

1. Faça um fork do projeto
2. Crie uma branch para sua feature (`git checkout -b feature/nova-feature`)
3. Commit suas mudanças (`git commit -m 'Adiciona nova feature'`)
4. Push para a branch (`git push origin feature/nova-feature`)
5. Abra um Pull Request

## 📄 Licença

Este projeto está sob a licença MIT. Veja o arquivo `LICENSE` para mais detalhes.

## 👨‍💻 Autor

Romario Almeida.

---

**Status do Projeto:** ✅ Ativo e em desenvolvimento

**Última atualização:** Agosto 2025
