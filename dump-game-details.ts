async function main() {
  const url = 'https://flagmag.com/api/games/69f5af6de7729de62249692d';
  console.log('Fetching', url);
  const res = await fetch(url);
  if (res.ok) {
    const data = await res.json();
    console.log('Data:', JSON.stringify(data, null, 2));
  } else {
    console.log('Error:', res.status);
  }
}

main().catch(console.error);
