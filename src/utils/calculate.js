//! TERMS

// selling price (sp), harga jual
// cost price (cp), harga beli

//! RULES
// Profit: (SP) – (CP)
// Profit Percentage: (Profit/CP) x 100
// Loss: (SP) – (CP)
// Loss Percentage: (Loss/CP) x 100

// ! How to calculate
// 1. Menghitung untung per produk
//      gain = "Rindu" --> jumlah bungkus: 49 * 1000
//      net / percentage = (gain(50.000) - purchase price(30.000)) * 100 = 20.000 / 66.66%

// mencari laba bersih
export function profitPercent(gain, price) {
	// this is not accurate yet
	return ((+gain / +price) * 100).toFixed(2);
}

export function margin(gain, price) {
	const result = isNaN(+gain - +price) ? 0 : +gain - +price;
	return result;
}
