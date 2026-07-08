# Fiki Off

Protótipo funcional em React Native do app Fiki Off.

https://github.com/user-attachments/assets/902c3179-5ad5-4b83-b70e-44d54b08dc40

## Documentação de arquitetura

A documentação TOGAF (negócio, dados, aplicação, tecnologia, C4, ADRs, segurança e ops) está em **[`docs/`](docs/README.md)**.

Artefatos de infraestrutura:

- [`firestore.rules`](firestore.rules) — regras de segurança Firestore
- [`firebase.json`](firebase.json) — configuração Firebase CLI
- [`.firebaserc.example`](.firebaserc.example) — template de projetos Firebase

## Estrutura de arquivos

```
FikiOff/
├── App.tsx
├── docs/                    ← arquitetura TOGAF, ADRs, segurança, ops
├── firestore.rules
├── firebase.json
├── package.json
└── src/
    ├── hooks/
    │   └── useOfflineTimer.ts       ← lógica principal do timer
    ├── components/
    │   ├── MainButton.tsx           ← botão central animado
    │   ├── TimerDisplay.tsx         ← exibição hh:mm:ss
    │   ├── StatsRow.tsx             ← cards de estatísticas
    │   └── SessionHistory.tsx       ← histórico de sessões
    └── screens/
        └── HomeScreen.tsx           ← tela principal
```

## Como rodar

### Pré-requisitos
- Node.js >= 18
- React Native CLI (`npm install -g react-native-cli`)
- Android Studio (para Android) ou Xcode (para iOS)

### Instalação

```bash
npm install

# iOS (macOS apenas)
cd ios && pod install && cd ..
```

### Executar

```bash
# Android
npm run android

# iOS
npm run ios
```

---

## Funcionalidade principal

O hook `useOfflineTimer` centraliza toda a lógica:

- `isOffline` — estado atual
- `elapsedMs` — milissegundos da sessão atual (atualizado a cada segundo)
- `totalTodayMs` — total acumulado do dia
- `sessionCount` — número de sessões
- `history` — últimas 5 sessões (horário de início + duração)
- `toggle()` — inicia ou encerra uma sessão

---

## Ativar o Modo Avião de verdade (opcional)

### Android

Instale o pacote nativo:

```bash
npm install react-native-airplane-mode-control
```

Adicione a permissão no `android/app/src/main/AndroidManifest.xml`:

```xml
<uses-permission android:name="android.permission.WRITE_SETTINGS" />
```

Descomente o bloco no topo de `HomeScreen.tsx`:

```tsx
import AirplaneMode from 'react-native-airplane-mode-control';

async function setAirplaneMode(enable: boolean) {
  if (Platform.OS === 'android') {
    await AirplaneMode.setAirplaneMode(enable);
  }
}
```

E chame `setAirplaneMode(true)` ao iniciar e `setAirplaneMode(false)` ao encerrar dentro de `handleToggle`.

### iOS

No iOS **não é possível** ativar o modo avião programaticamente (restrição da Apple).
A abordagem recomendada é abrir as Configurações com um alerta:

```tsx
import { Alert, Linking } from 'react-native';

Alert.alert(
  'Ativar modo avião',
  'Vá em Configurações > Modo Avião para ativar manualmente.',
  [
    { text: 'Abrir Configurações', onPress: () => Linking.openURL('App-Prefs:root=AIRPLANE_MODE') },
    { text: 'OK' },
  ]
);
```

---

## Timer em background (opcional)

Para manter o timer contando com o app minimizado:

```bash
npm install react-native-background-timer
```

Substitua o `setInterval` nativo em `useOfflineTimer.ts`:

```tsx
import BackgroundTimer from 'react-native-background-timer';

// no lugar de setInterval:
intervalRef.current = BackgroundTimer.setInterval(() => {
  if (startTimeRef.current) {
    setElapsedMs(Date.now() - startTimeRef.current);
  }
}, 1000);

// no lugar de clearInterval:
BackgroundTimer.clearInterval(intervalRef.current);
```

---

## Persistência de dados (opcional)

Para salvar o histórico entre sessões, use AsyncStorage:

```bash
npm install @react-native-async-storage/async-storage
```

Salve e carregue `totalTodayMs`, `sessionCount` e `history` no hook.
