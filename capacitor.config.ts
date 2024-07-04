import type { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.segundo.parcial',
  appName: 'SP Restaurante',
  webDir: 'www',
  plugins: {
    SplashScreen: {
      launchAutoHide: false,
      showSpinner: false,
    },
    PushNotifications: {
      presentationOptions: ['badge', 'sound', 'alert'],
    },
  },
};
export default config;
