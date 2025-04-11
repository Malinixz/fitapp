# FitApp

Essa é uma aplicação mobile desenvolvida com React Native e Expo, com um backend em Node.js Express e banco de dados PostgreSQL.

## Visão Geral

FitApp permite aos usuários rastrear seu progresso de saúde e nutrição, incluindo:
- Monitoramento de mudanças de peso.
- Contagem diária de calorias e macronutrientes ingeridos.
- Contagem de passos.
- Visualização gráfica de dados históricos e diários.
- Busca de alimentos através da API do OpenFoodFacts, tanto por descrição quanto por código de barras (EAN-13).
- Registro de alimentos feito tanto por quantidade de porções quanto por gramatura.

OBS: Além do automonitoramento dietético, o App também sugere uma distribuição de macronutrientes para o usuário a partir de seus dados cadastrais.

## Integração com API Externa
FitApp utiliza a API do OpenFoodFacts para consultar alimentos a partir de:

- Descrição do alimento (ex: "arroz integral", "iogurte grego").

- Código de barras EAN-13, permitindo escaneamento pela câmera do dispositivo.

Esses dados são usados para compor o banco de alimentos presentes nas refeições do usuário.

## Tecnologias Utilizadas

### Frontend
- React Native
- Expo
- Expo Router (roteamento por arquivos)
- Context API para gerenciamento de estado global
- React Native Paper para alguns componentes visuais
- React Native Reanimated para interações gestuais

### Backend
- Node.js
- Express
- JWT para autenticação
- PostgreSQL (containerizado com Docker)

## Pré-requisitos

- Node.js
- Expo CLI
- Docker e Docker Compose
- Git

## Instalação e Configuração

### Clonando o Repositório

```bash
git clone https://github.com/seu-usuario/fitapp.git
cd fitapp
```

### Frontend (React Native/Expo)

```bash
cd front
npm install
```

### Backend (Node.js/Express)

```bash
cd back
npm install
```

### Banco de Dados (PostgreSQL via Docker)

```bash
docker-compose up -d
```

## Inicializando a Aplicação

### Backend

```bash
cd back
npm run dev
```

### Frontend

```bash
cd front
npx expo start
```
## Executando o App com Expo Go

Após iniciar o servidor de desenvolvimento com `npx expo start`, você tem várias opções para executar o app:

#### Em um dispositivo físico
1. Instale o app Expo Go na [App Store (iOS)](https://apps.apple.com/app/expo-go/id982107779) ou [Google Play Store (Android)](https://play.google.com/store/apps/details?id=host.exp.exponent)
2. Se estiver usando iOS, escaneie o QR code com a câmera
3. Se estiver usando Android, abra o app Expo Go e escaneie o QR code
4. O app será carregado automaticamente no seu dispositivo

#### Em um simulador/emulador
1. Para iOS (macOS): `npx expo start --ios` (requer Xcode instalado)
2. Para Android: `npx expo start --android` (requer Android Studio e emulador configurado)

#### Dicas
- Certifique-se de que seu dispositivo móvel e computador estejam na mesma rede Wi-Fi
- Use `npx expo start --tunnel` se estiver tendo problemas de conexão na mesma rede

## Estrutura do Projeto

```
fitapp/
├── front/                 # Código do frontend React Native/Expo
│   ├── app/               # Navegação e rotas usando Expo Router
│   ├── assets/            # Imagens
│   ├── components/        # Componentes reutilizáveis
│   ├── contexts/          # Context API para gerenciamento de estados
│   ├── styles/            # Estilos globais e definições de cores
│   ├── hooks/             # Hooks personalizados
│   ├── services/          # Serviços de chamada de API
│   ├── utils/             # Funções utilitárias
│   ├── types/             # Tipos personalizados
│   └── ...
├── back/                  # Código do backend Node.js/Express
│   ├── controllers/       # Controladores de rota
│   ├── database/
│   │   ├── models/        # Modelos de dados
│   │   ├── config/        # Configuração do Banco de Dados
│   ├── routes/            # Definições de rotas da API
│   ├── middleware/        # Middlewares para as rotas Express
│   ├── docker-compose.yml # Configuração do Docker para PostgreSQL
│   └── ...
```

## 📬 Contato

Email - [miguel.malini5963@gmail.com](mailto:miguel.malini5963@gmail.com)

LinkedIn : [https://www.linkedin.com/in/miguel-malini/](https://www.linkedin.com/in/miguel-malini/)