import QRCode from 'react-native-qrcode-svg';

const PaymentQRCode = ({ vpa, payeeName, amount, transactionNote, transactionRef }) => {
    const upiURL = generateUPIURL(vpa, payeeName, amount, transactionNote, transactionRef);
    
    return (
        <View style={{ justifyContent: 'center', alignItems: 'center' }}>
            <QRCode value={upiURL} size={200} />
            <Text>Scan this QR code to pay</Text>
        </View>
    );
};
export default PaymentQRCode;