export function toIntlCurrency(amount) {
	const numericAmount = parseFloat(amount ? amount?.toString() : 0)
	if (isNaN(numericAmount)) {
		throw new Error('Invalid amount. Please provide a valid numeric amount.')
	}

	try {
		const formattedCurrency = new Intl.NumberFormat('en-NG', {
			style: 'currency',
			currency: 'NGN',
			currencyDisplay: 'symbol',
		}).format(numericAmount)
		return formattedCurrency
	} catch (error) {
		throw new Error('Invalid currency or locales provided.')
	}
}
