/* global $ */

$(document).ready(function () {
    var counter = 1;

    $("#addrow").on("click", function () {
        var newRow = $("<tr>");
        var cols = "";

        cols += `<td>
                            <div class="col">
                                <select class="custom-select" name="medication` + counter + `">
                                    <option selected disabled>-- Medication --</option>
                                    <option value="00">Ibuprofen 200mg</option>
                                    <option value="01">Citalopram 10mg</option>
                                    <option value="02">Diclofenac 25mg</option>
                                    <option value="03">Atorvastatin 40mg</option>
                                    <option value="04">Amoxicillin 250mg</option>
                                    <option value="05">Paracetamol 500mg</option>
                                    <option value="06">Amlodipine 5mg</option>
                                    <option value="07">Metformin 850mg</option>
                                    <option value="08">Codeine 15mg</option>
                                    <option value="09">Bisoprolol 2.5mg</option>
                                    <option value="10">Aspirin 75mg</option>
                                </select>
                            </div>
                        </td>`;
        cols += `<td>
                    <div class="form-check">
                        <input class="form-check-input" type="checkbox" name="morning` + counter + `" value="1">
                        <input class="form-check-input" type="hidden" name="morning` + counter + `" value="0">

                   </div>
                </td>`;
                
        cols += `<td>
                    <div class="form-check">
                        <input class="form-check-input" type="checkbox" name="afternoon` + counter + `" value="1">
                        <input class="form-check-input" type="hidden" name="afternoon` + counter + `" value="0">
                    </div>
                </td>`;

        cols += `<td>
                    <div class="form-check">
                        <input class="form-check-input" type="checkbox" name="evening` + counter + `" value="1">
                        <input class="form-check-input" type="hidden" name="evening` + counter + `" value="0">
                    </div>
                </td>`;
                
        cols += `<td>
                    <div class="form-check">
                        <input class="form-check-input" type="checkbox" name="night` + counter + `" value="1">
                        <input class="form-check-input" type="hidden" name="night` + counter + `" value="0">
                    </div>
                </td>`;
        
        newRow.append(cols);
        $("table.order-list").append(newRow);
        counter++;
    });



    $("table.order-list").on("click", ".ibtnDel", function (event) {
        $(this).closest("tr").remove();       
        counter -= 1
    });


});



function calculateRow(row) {
    var price = +row.find('input[name^="price"]').val();

}

function calculateGrandTotal() {
    var grandTotal = 0;
    $("table.order-list").find('input[name^="price"]').each(function () {
        grandTotal += +$(this).val();
    });
    $("#grandtotal").text(grandTotal.toFixed(2));
}