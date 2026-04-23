async function test() {
    try {
        const res = await fetch('http://localhost:5000/api/admin/registrations');
        const data = await res.json();
        console.log('Count:', data.count);
        console.log('Success:', data.success);
        console.log('First team:', data.data[0]?.teamName);
        console.log('Last team:', data.data[data.data.length - 1]?.teamName);
    } catch (err) {
        console.error('Error:', err.message);
    }
}

test();
