document.addEventListener("DOMContentLoaded", function () {
    var pantalla = document.getElementById("view");
    var expresion = "";

    function updateScreen() {
        pantalla.value = expresion || "0";
    }

    function agregarValor(valor) {
        expresion += valor;
        updateScreen();
    }

    function calcular() {
        try {
            expresion = eval(expresion).toString();
        } catch (e) {
            expresion = "Error";
        }
        updateScreen();
    }

    function borrar() {
        expresion = "";
        updateScreen();
    }

    function setListeners() {
        var nums = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "."];
        var ops = { "+": "opPlus", "-": "opMinus", "*": "opMultiply", "/": "opDivide" };

        for (var i = 0; i < nums.length; i++) {
            var id = "b" + (nums[i] === "." ? "Dot" : nums[i]);
            document.getElementById(id).onclick = function (val) {
                return function () {
                    agregarValor(val);
                };
            }(nums[i]);
        }

        for (var op in ops) {
            document.getElementById(ops[op]).onclick = function (val) {
                return function () {
                    agregarValor(val);
                };
            }(op);
        }

        document.getElementById("igual").onclick = calcular;
        document.getElementById("borrar").onclick = borrar;
    }

    setListeners();
    updateScreen();
});
