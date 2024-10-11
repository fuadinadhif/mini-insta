import net from 'net';

export function checkPort(port: number) {
  return new Promise((resolve, reject) => {
    const server = net.createServer();

    server.once('error', (error: { code?: string }) => {
      if (error.code === 'EADDRINUSE') {
        resolve(false);
      } else {
        reject(error);
      }
    });

    server.once('listening', () => {
      server.close();
      resolve(true);
    });

    server.listen(port);
  });
}

export async function getAvailablePort(startingPort: number) {
  let port = startingPort;
  let portAvailable = await checkPort(port);

  while (!portAvailable) {
    console.log(`Port ${port} is in use, trying port ${port + 1}`);
    port += 1;
    portAvailable = await checkPort(port);
  }

  return port;
}
