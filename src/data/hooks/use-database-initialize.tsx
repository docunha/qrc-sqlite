import { useEffect, useState } from 'react';
import { dataSource } from '../configs/db';

export function useDatabaseInitialize() {
  const [ready, setReady] = useState(false);

  useEffect(() => {
    if (!dataSource.isInitialized) {
      dataSource
        .initialize()
        .then(() => {
          console.log('Database connected!');
          setReady(true);
        })
        .catch((e) => {
          console.log('Erro on database initialize', e);
          setReady(false);
        });
    }

    return () => {
      dataSource.destroy();
      setReady(false);
    };
  }, []);

  return { ready };
}
