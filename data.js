function checkout(){// 🔐 Virtual Account Bank
const VA = {
  BCA: {
    bank: "BCA",
    no: "1234567890123456",
    nama: "Bili Insomnia"
  },
  BRI: {
    bank: "BRI",
    no: "7778889990001234",
    nama: "Bili Insomnia"
  },
  Mandiri: {
    bank: "Mandiri",
    no: "1122334455667788",
    nama: "Bili Insomnia"
  }
};

  if(cart.length === 0){
    alert("Keranjang kosong!");
    return;
  }

  const pay = document.getElementById("payment-method").value;
  const name = document.getElementById("cust-name").value;
  const phone = document.getElementById("cust-phone").value;
  const address = document.getElementById("cust-address").value;

  // Validasi Form
  if(pay === "" || name === "" || phone === "" || address === ""){
    alert("Mohon lengkapi semua data sebelum checkout!");
    return;
  }

  // Buat Ringkasan Pesanan
  let pesan = `🛒 *BILIINSOMNIA T-SHIRT*\n\n👤 *Data Pelanggan*\n`;
  pesan += `Nama: ${name}\n`;
  pesan += `WhatsApp: ${phone}\n`;
  pesan += `Alamat: ${address}\n\n`;

  pesan += `📦 *Pesanan:*\n`;
  cart.forEach(x => {
    pesan += `- ${x.name} (Size ${x.size}) — ${formatRupiah(x.price)}\n`;
  });

  const total = cart.reduce((a,b) => a + b.price, 0);
  pesan += `\n💰 *Total: ${formatRupiah(total)}*\n`;
  pesan += `💳 *Pembayaran: ${pay}*\n`;

  // Nomor Rekening
  if(pay.includes("BCA")){
    pesan += `\n📌 *Transfer ke BCA*\nNo: 1234567890 a/n Bili Insomnia\n`;
  } else if(pay.includes("BRI")){
    pesan += `\n📌 *Transfer ke BRI*\nNo: 0987654321 a/n Bili Insomnia\n`;
  } else if(pay.includes("Mandiri")){
    pesan += `\n📌 *Transfer ke Mandiri*\nNo: 555666777 a/n Bili Insomnia\n`;
  } else {
    pesan += `\n🚚 *Bayar di tempat (COD)*\n`;
  }

  pesan += `\n📲 Kirim bukti/order via WhatsApp:\n👇`;

  // GANTI nomor WA toko kamu
  let waLink = "https://wa.me/6281234567890?text=" + encodeURIComponent(pesan);

  // Tampilkan konfirmasi
  let bankInfo = "";

if(pay.includes("BCA")){
  bankInfo = `<div class="va-box"><h3>Virtual Account BCA</h3><p><b>${VA.BCA.no}</b><br>a/n ${VA.BCA.nama}</p></div>`;
}
else if(pay.includes("BRI")){
  bankInfo = `<div class="va-box"><h3>Virtual Account BRI</h3><p><b>${VA.BRI.no}</b><br>a/n ${VA.BRI.nama}</p></div>`;
}
else if(pay.includes("Mandiri")){
  bankInfo = `<div class="va-box"><h3>Virtual Account Mandiri</h3><p><b>${VA.Mandiri.no}</b><br>a/n ${VA.Mandiri.nama}</p></div>`;
}

const html = `
  <div class="checkout-box">
    <h2>Pesanan Berhasil!</h2>
    ${bankInfo}
    <pre>${pesan}</pre>
    <a class="btn wa-btn" href="${waLink}" target="_blank">Kirim ke WhatsApp</a>
  </div>
`;


  document.body.innerHTML = html;
  localStorage.removeItem("cart");
}
function randomVA() {
  return "8808" + Math.floor(Math.random() * 100000000); // Contoh BCA VA
}

function generateQR() {
  const totalHarga = localStorage.getItem('totalHarga') || 50000; // contoh
  const qrisData = `00020101021126660012ID.CO.QRIS.WWW0111TEST QRIS0412345678905204${totalHarga}53033605407CASHLESS5802ID`;
  return `https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${qrisData}`;
}

function proceedPayment() {
  let name = document.getElementById("cName").value;
  let phone = document.getElementById("cPhone").value;
  let address = document.getElementById("cAddress").value;

  if (name == "" || phone == "" || address == "") {
    alert("Semua data wajib diisi!");
    return;
  }

  document.getElementById("paymentBox").innerHTML = `
    <h2>Pilih Metode Pembayaran</h2>

    <p><b>Virtual Account (VA)</b><br>Bank BCA: <span style="color:blue">${randomVA()}</span></p>

    <p><b>QRIS Pembayaran</b></p>
    <img src="${generateQR()}" style="width:220px;border:5px solid #eee;border-radius:10px" />

    <p>Silakan screenshot dan bayar via aplikasi e-wallet atau mobile banking.</p>
  `;
}
