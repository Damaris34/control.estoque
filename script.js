document.getElementById('stockForm').addEventListener('submit', function(event) {
    event.preventDefault();
    // Aqui você pode adicionar a lógica para enviar os dados para o servidor Java
    alert('Dados registrados com sucesso!');
});

document.getElementById('exportPdf').addEventListener('click', function() {
    // Aqui você pode adicionar a lógica para exportar os dados para PDF
    alert('Exportação para PDF iniciada!');
});
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/stock")
public class StockController {

    @PostMapping("/register")
    public String registerStock(@RequestBody StockData stockData) {
        // Lógica para registrar o estoque
        return "Estoque registrado com sucesso!";
    }

    @GetMapping("/exportPdf")
    public void exportPdf() {
        // Lógica para exportar para PDF usando iText ou Apache PDFBox
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
