document.getElementById('stockForm').addEventListener('submit', function(event) {
    event.preventDefault();

    const formData = {
        registrationDate: document.getElementById('registrationDate').value,
        materialName: document.getElementById('materialName').value,
        quantityUsed: document.getElementById('quantityUsed').value,
        missingMaterial: document.getElementById('missingMaterial').value,
        purchaseQuantity: document.getElementById('purchaseQuantity').value
    };

    fetch('/api/stock/register', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
    })
    .then(response => response.text())
    .then(data => {
        alert(data);
    })
    .catch(error => {
        console.error('Erro ao registrar estoque:', error);
    });
});

document.getElementById('exportPdf').addEventListener('click', function() {
    fetch('/api/stock/exportPdf', {
        method: 'GET'
    })
    .then(response => response.blob())
    .then(blob => {
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.style.display = 'none';
        a.href = url;
        a.download = 'estoque.pdf';
        document.body.appendChild(a);
        a.click();
        window.URL.revokeObjectURL(url);
        alert('Exportação para PDF concluída!');
    })
    .catch(error => {
        console.error('Erro ao exportar para PDF:', error);
    });
});
import org.springframework.web.bind.annotation.*;
import org.springframework.http.HttpHeaders;
import org.springframework.http.ResponseEntity;
import com.itextpdf.text.Document;
import com.itextpdf.text.DocumentException;
import com.itextpdf.text.Paragraph;
import com.itextpdf.text.pdf.PdfWriter;

import java.io.ByteArrayOutputStream;
import java.util.ArrayList;
import java.util.List;

@RestController
@RequestMapping("/api/stock")
public class StockController {

    private List<StockData> stockList = new ArrayList<>();

    @PostMapping("/register")
    public String registerStock(@RequestBody StockData stockData) {
        stockList.add(stockData);
        return "Estoque registrado com sucesso!";
    }

    @GetMapping("/exportPdf")
    public ResponseEntity<byte[]> exportPdf() {
        ByteArrayOutputStream outputStream = new ByteArrayOutputStream();
        Document document = new Document();
        try {
            PdfWriter.getInstance(document, outputStream);
            document.open();
            for (StockData stockData : stockList) {
                document.add(new Paragraph("Data de Registro: " + stockData.getRegistrationDate()));
                document.add(new Paragraph("Nome do Material: " + stockData.getMaterialName()));
                document.add(new Paragraph("Quantidade Utilizada: " + stockData.getQuantityUsed()));
                document.add(new Paragraph("Material em Falta: " + stockData.getMissingMaterial()));
                document.add(new Paragraph("Quantidade para Compra: " + stockData.getPurchaseQuantity()));
                document.add(new Paragraph("--------------------------------------------------"));
            }
        } catch (DocumentException e) {
            e.printStackTrace();
        } finally {
            document.close();
        }

        HttpHeaders headers = new HttpHeaders();
        headers.set(HttpHeaders.CONTENT_DISPOSITION, "attachment; filename=estoque.pdf");
        return ResponseEntity.ok().headers(headers).body(outputStream.toByteArray());
    }
}

class StockData {
    private String registrationDate;
    private String materialName;
    private int quantityUsed;
    private String missingMaterial;
    private int purchaseQuantity;

    // Getters e Setters
}
