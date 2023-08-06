class MatrixTable {
    constructor(matrix, parentId) {
        this.matrix = matrix
        this.divTable = document.createElement('div')
        this.divTable.className = 'tableContainer'
        this.table = document.createElement('table')
        this.divTable.appendChild(this.table)
        document.getElementById(parentId).appendChild(this.divTable)
        this.generateTableInnerStructure()
        this.updateInputFields()
    }

    generateTableInnerStructure() {
        if (this.table.children.length >= 1)
            this.table.children[0].remove()

        let tableBody = document.createElement('tbody')

        for (let r = 0; r < this.matrix.rows; r++) {
            let tr = document.createElement('tr')
            for (let c = 0; c < this.matrix.cols; c++) {
                let td = document.createElement('td'),
                    input = document.createElement('input')
                    
                td.style.width = DEFAULTS.cellWidth + 'px'
                td.style.height = DEFAULTS.cellHeight + 'px'
                // td.style.padding = DEFAULTS.cellPadding + 'px'
                td.style.margin = DEFAULTS.cellPadding + 'px'
                input.style.width = (DEFAULTS.cellWidth) + 'px'
                input.style.height = (DEFAULTS.cellHeight) + 'px'

                // input.type = 'number'

                input.onclick = function() {
                    this.oldValue = this.value
                }
                let _this = this
                input.onchange = function() {
                    if (isNaN(this.value)) {
                        alert('matrix value must be a number')
                        this.value = this.oldValue
                    } else {
                        _this.changeMatrixArray(r, c, this.value, this.oldValue)
                    }
                }

                td.appendChild(input)
                tr.appendChild(td)
            }
            tableBody.append(tr)
        }
        this.table.appendChild(tableBody)
    }

    changeMatrixArray(row, col, value, oldValue) {
        this.matrix.array[col][row] = Number(value)
        console.log('matrix changed from '+value+' to '+oldValue+' @ r'+row+'c'+col)
        console.log(this.matrix.toString())
    }
    
    updateInputFields() {
        let inputs = this.table.getElementsByTagName('input')
        for(let i = 0; i < this.matrix.rows; i++)
            for (let j = 0; j < this.matrix.cols; j++)    
                inputs[i*this.matrix.cols+j].value = this.matrix.array[i][j]
    }

    refreshTable() {
        this.generateTableInnerStructure()
        this.updateInputFields()
    }

    
}