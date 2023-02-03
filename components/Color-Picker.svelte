<script>
    import { createEventDispatcher } from 'svelte'
    import { fade } from 'svelte/transition';
    import {
        evalES,
    } from "../lib/utils";

    const dispatch = createEventDispatcher();

    export let color = ''
    export let label = ''
    // export let js = false

    const sanitizeHex = (hexColor) => {
        const hexString = hexColor.replace('#', '')
        if (hexString.length < 6) {     // catch 3 digit hex 
            return `#${hexString[0]}${hexString[0]}${hexString[1]}${hexString[1]}${hexString[2]}${hexString[2]}`
        } else {
            return `#${hexString}`
        }
    }
    let _color = sanitizeHex(color) 
    console.log('_color', _color);
    
    const hexToArray = (hexString) => {
        const hexColor = hexString.replace('#', '');
        const r = parseInt(hexColor.slice(0, 2), 16) / 255 || 0,
        g = parseInt(hexColor.slice(2, 4), 16) / 255 || 0,
        b = parseInt(hexColor.slice(4, 6), 16) / 255 || 0;
        return [r, g, b, 1];
    }
    function arrayToHex(colorArray) {
        const red = parseInt(colorArray[0] * 255)
        const green = parseInt(colorArray[1] * 255)
        const blue = parseInt(colorArray[2] * 255)

        return `#${red.toString(16)}${green.toString(16)}${blue.toString(16)}`;
    };
    const parseColorArray = (colorString) => {
        if (colorString) {
            const colorArray = JSON.parse(`[${colorString}]`)
            console.log('colorArray', colorArray);
            const colorUpdate = arrayToHex(colorArray)
            console.log('colorUpdate', colorUpdate);
            _color = colorUpdate
            dispatch('update', {state: arrayToHex(colorArray)})
        }
    }

    const colorScript = () => {

        return `var thisComp = app.project.activeItem
var color = [${ hexToArray(color) }];
if (!thisComp) {
    var pickerComp = app.project.items.addComp('Picker', 100, 100, 1, 5, 24);
    pickerComp.openInViewer();
    thisComp = pickerComp
    var retColor = pickColor(pickerComp, color)
    pickerComp.remove()
    retColor
} else {
    var retColor = pickColor(thisComp, color)
    retColor
}

function pickColor(comp, color) {
    var pickerLayer = comp.layers.addShape();
    pickerLayer.name = 'Picker';
    var fill = pickerLayer('ADBE Root Vectors Group').addProperty('ADBE Vector Graphic - Fill');
    var fillColorProp = fill('ADBE Vector Fill Color');
    fillColorProp.setValue(color);
    fillColorProp.selected = true;
    app.executeCommand(2240);
    
    pickedColor = fillColorProp.value;
    pickerLayer.remove()
    return pickedColor
}`
        // return `
        // var retColor = [1,1,1,1];
        // try {
        // var thisComp = app.project.activeItem
        // if (!thisComp) {
        //     var thisComp = app.project.items.addComp('Picker', 100, 100, 1, 5, 24);
        //     pickerComp.openInViewer()
        //     pickColor(pickerComp, [${ hexToArray(_color) }]
        // }
        // // var pickerComp = app.project.activeItem
        // if (thisComp) {
        //     //if (!thisComp || !(thisComp instanceof CompItem)) { return false }
        //     // app.beginUndoGroup('Color picker');
            
        //     var pickerLayer = thisComp.layers.addShape();
        //     pickerLayer.name = 'Picker';
        //     var fill = pickerLayer('ADBE Root Vectors Group').addProperty('ADBE Vector Graphic - Fill');
        //     var fillColorProp = fill('ADBE Vector Fill Color');
        //     // fillColorProp.setValue([1,0,1,1]);
        //     fillColorProp.setValue([${ hexToArray(_color) }]);
        //     fillColorProp.selected = true;
        //     app.executeCommand(2240);
        //     retColor = fillColorProp.value;
        //     // app.endUndoGroup();
        //     // if (pickerLayer) {
        //     //     pickerLayer.remove();
        //     // }
        //     // app.executeCommand(2371);
        //     // thisComp.remove()
        //     retColor
        // } else {
        //     null;
        // }

        // } catch (e) { alert(e.toString() + "Error on line: " + e.line.toString());}
        
        // function pickColor(comp, starringColor) {
            
        // }
        // `
    }
</script>

<div class="picker-wrapper" on:click={() => evalES(colorScript(), true).then(data => parseColorArray(data))}>
    <div class="swatch">
        <div class="swatch-color" 
        style="background: { color }"/>
    </div>
    <!-- {color} : {_color} -->
    <span class="label">
        {label}
    </span>
</div>


<style>

.swatch {
    width: 22px;
    height: 18px;
    border: 1px solid var(--color-btn-border);
}
.swatch-color {
    /* background: skyblue; */
    width: calc(100% - 2px);
    height: calc(100% - 2px);
    margin: 1px;
}
.picker-wrapper {
    display: flex;
    align-items: center;
    gap: 8px;
    margin-right: 8px;
}

</style>