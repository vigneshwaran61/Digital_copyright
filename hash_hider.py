import fitz  # PyMuPDF
import os
import sys

# Check argument count
if len(sys.argv) != 4:
    print("Usage: python3 script.py <input_file> <output_filename> <identifier>")
    sys.exit(1)

input_pdf = sys.argv[1]
output_filename = sys.argv[2]  # Just the file name (e.g., "watermarked.pdf")
identifier = sys.argv[3]       # Format: filehash&walletAddress

# Split combined identifier
try:
    file_hash, wallet_address = identifier.split("&")
except ValueError:
    print("Invalid identifier format. Expected: filehash&walletAddress")
    sys.exit(1)

# Output path: ubuntu/<wallet_address>/<output_filename>
output_dir = os.path.join("ubuntu", wallet_address)
os.makedirs(output_dir, exist_ok=True)
output_path = os.path.join(output_dir, output_filename)

print(f"[INFO] Wallet: {wallet_address}")
print(f"[INFO] Saving to: {output_path}")

# Embed watermark into PDF
def embed_hash_in_pdf(input_pdf_path, output_pdf_path, watermark_text):
    try:
        if not os.path.exists(input_pdf_path):
            print(f"Input file '{input_pdf_path}' does not exist.")
            return

        doc = fitz.open(input_pdf_path)

        for i, page in enumerate(doc):
            page.insert_text(
                (20, 20),  # Position
                watermark_text,
                fontsize=1,
                color=(1, 1, 1),  # White text (effectively invisible)
                render_mode=3    # Invisible text mode
            )
            print(f"[INFO] Watermarked page {i+1}")

        doc.save(output_pdf_path, incremental=False, encryption=fitz.PDF_ENCRYPT_KEEP)
        doc.close()

        if os.path.exists(output_pdf_path):
            print(f"[SUCCESS] Watermarked file saved: {output_pdf_path}")
        else:
            print("[ERROR] File save failed.")

    except Exception as e:
        print("[ERROR]", e)

# Execute watermarking
embed_hash_in_pdf(input_pdf, output_path, identifier)
