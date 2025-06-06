function generateCaption(data) {
  const location = data.location || 'Unknown';
  const area = data.area || 'N/A';
  const price = data.price || 'N/A';
  return `🏠 Property listed by ${data.ownerName || 'Seller'} in ${location}\n` +
         `📐 Area: ${area}\n💰 Price: ₹${price}\n` +
         `#PropertyForSale #${location.replace(/\s+/g, '')} #RealEstate #HomeBuyers`;
}

module.exports = { generateCaption };
