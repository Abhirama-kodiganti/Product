import cv2
import numpy as np
from pyzbar.pyzbar import decode

def main():
    cap = cv2.VideoCapture(0)
    if not cap.isOpened():
        raise RuntimeError("Could not open video device")

    # Set camera resolution
    target_width, target_height = 1280, 720
    cap.set(cv2.CAP_PROP_FRAME_WIDTH, target_width)
    cap.set(cv2.CAP_PROP_FRAME_HEIGHT, target_height)

    cv2.namedWindow('Barcode Scanner', cv2.WINDOW_NORMAL)

    try:
        while True:
            ret, frame = cap.read()
            if not ret:
                print("Frame capture failed, skipping...")
                continue

            # Preprocessing for barcode detection
            gray = cv2.cvtColor(frame, cv2.COLOR_BGR2GRAY)
            blurred = cv2.GaussianBlur(gray, (3, 3), 0)
            
            # Use different thresholding techniques
            enhanced_adaptive = cv2.adaptiveThreshold(
                blurred, 255, cv2.ADAPTIVE_THRESH_GAUSSIAN_C,
                cv2.THRESH_BINARY, 11, 2
            )
            
            # Decode from multiple processed versions
            decoded = []
            for img in [blurred, enhanced_adaptive]:
                try:
                    results = decode(img)
                    for result in results:
                        # Filter out QR codes
                        if result.type != 'QRCODE':
                            decoded.append(result)
                except Exception as e:
                    print(f"Decoding error: {e}")
                    continue

            # Process and display barcodes
            for barcode in decoded:
                try:
                    barcode_data = barcode.data.decode('utf-8')
                    barcode_type = barcode.type
                except UnicodeDecodeError:
                    continue

                # Draw barcode polygon
                points = barcode.polygon
                if len(points) >= 4:
                    pts = np.array(points, dtype=np.int32).reshape((-1, 1, 2))
                    cv2.polylines(frame, [pts], True, (0, 255, 0), 2)

                    # Display barcode information
                    (x, y, w, h) = barcode.rect
                    text = f"{barcode_data} ({barcode_type})"
                    cv2.rectangle(frame, (x, y - 25), (x + len(text)*13, y), (0, 255, 0), -1)
                    cv2.putText(frame, text, (x, y - 10),
                                cv2.FONT_HERSHEY_SIMPLEX, 0.6, (0, 0, 0), 2)

            cv2.imshow('Barcode Scanner', frame)

            if cv2.waitKey(1) in [ord('q'), 27]:
                break

    finally:
        cap.release()
        cv2.destroyAllWindows()

if __name__ == '__main__':
    main()