import { useCallback, useEffect, useRef } from 'react';

import Alert from '@mui/material/Alert';
import Button from '@mui/material/Button';
import { useRegisterSW } from 'virtual:pwa-register/react';
import useNotifications from '../../hooks/useNotification';


// TODO (Suren): this should be a custom hook :)
function SW() {
  const [notificationsActions] = useNotifications();
  const notificationKey = useRef(null);
  const {
    offlineReady: [offlineReady, setOfflineReady],
    needRefresh: [needRefresh, setNeedRefresh],
    updateServiceWorker,
  } = useRegisterSW();

  const close = useCallback(() => {
    setOfflineReady(false);
    setNeedRefresh(false);

    if (notificationKey.current) {
      notificationsActions.close(notificationKey.current);
    }
  }, [setOfflineReady, setNeedRefresh, notificationsActions]);

  useEffect(() => {
    if (needRefresh) {
      notificationKey.current = notificationsActions.push({
        message: 'El nuevo contenido está disponible, haga clic en el botón de recarga para actualizar.',
        options: {
          variant: 'warning',
          persist: true,
          action: (
            <>
              <Button onClick={() => updateServiceWorker(true)}>Actualizar</Button>
              <Button onClick={close}>Cerrar</Button>
            </>
          ),
        },
      });
    }
  }, [close, needRefresh, offlineReady, notificationsActions, updateServiceWorker]);

  return null;
}

export default SW;
