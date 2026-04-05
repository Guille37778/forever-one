async function test() {
  try {
    const body = new URLSearchParams();
    body.set('email', 'Joseguerrero2189.a@gmail.com');
    body.set('password', 'Admin1234');

    const res = await fetch('http://127.0.0.1:4321/admin/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: body.toString(),
      redirect: 'manual'
    });

    console.log('STATUS:', res.status);
    console.log('--- HEADERS ---');
    res.headers.forEach((v, k) => console.log(`  ${k}: ${v}`));
    if (res.status !== 302) {
      const text = await res.text();
      console.log('BODY (primeros 300 chars):', text.slice(0, 300));
    }
  } catch (e) {
    console.error('ERROR:', e.message);
  }
}
test();
