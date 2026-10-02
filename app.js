document.getElementById('formDaftar').addEventListener('submit', async function (e) {
    e.preventDefault();

    // Mengambil data dari form
    const nis = document.getElementById('nis').value.trim();
    const nama = document.getElementById('nama').value.trim();
    const divisi = document.getElementById('divisi').value;
    const email = document.getElementById('email').value.trim();

    // Mengambil elemen pesan
    const errNis = document.getElementById('errNis');
    const msgBox = document.getElementById('responseMessage');

    // Validasi NIS harus tepat 8 digit angka
    const nisRegex = /^[0-9]{8}$/;

    if (!nisRegex.test(nis)) {
        errNis.classList.remove('hidden');
        return;
    } else {
        errNis.classList.add('hidden');
    }

    // Membuat data JSON
    const payload = {
        nis,
        nama,
        divisi,
        email
    };

    try {
        // Mengirim data ke backend PHP
        const response = await fetch('api.php?action=daftar', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(payload)
        });

        // Mengubah response menjadi JSON
        const result = await response.json();

        // Menampilkan pesan
        msgBox.classList.remove('hidden');

        if (result.status === 'success') {
            msgBox.className =
                'mt-4 p-3 rounded-lg text-sm text-center font-medium bg-emerald-950 border border-emerald-500 text-emerald-300';

            msgBox.innerText = result.message;

            // Mengosongkan form
            document.getElementById('formDaftar').reset();

        } else {
            msgBox.className =
                'mt-4 p-3 rounded-lg text-sm text-center font-medium bg-rose-950 border border-rose-500 text-rose-300';

            msgBox.innerText = result.message;
        }

    } catch (error) {
        console.error('Fetch Error:', error);

        alert('Terjadi kesalahan koneksi ke server backend!');
    }
});