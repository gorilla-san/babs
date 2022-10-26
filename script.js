window.addEventListener("DOMContentLoaded", function() {
    var canvas = document.getElementById("canvas1");
    var engine = new BABYLON.Engine(canvas, true);
    canvas.width = 800;
    canvas.height = 800;
    var createScene = function () {
        var scene = new BABYLON.Scene(engine);
        scene.clearColor = new BABYLON.Color3.White();
        // var camera = new BABYLON.FreeCamera("camera1", 
        //     new BABYLON.Vector3(0,0,-10), scene);
        var box = BABYLON.Mesh.CreateBox("Box", 4.0, scene);
        var box2 = BABYLON.Mesh.CreateBox("Box2", 4.0, scene);
        var material = new BABYLON.StandardMaterial("material1", scene);
        material.wireframe = true;
        box2.material = material;
        box2.position = new BABYLON.Vector3(0, 5, 0);
        // var camera = new BABYLON.ArcRotateCamera("arcCamera", 
        //     BABYLON.Tools.ToRadians(45),
        //     BABYLON.Tools.ToRadians(45),
        //     10.0, box.position, scene);
        // camera.setTarget(BABYLON.Vector3.Zero());
        var camera = new BABYLON.FollowCamera("followCam", new BABYLON.Vector3.Zero(),scene);
        camera.lockedTarget = box;
        camera.radius = 20;
        camera.heightOffset = 10;
        camera.attachControl(canvas, true);

        // camera.keysUp.push(87);
        // camera.keysDown.push(83);
        // camera.keysLeft.push(65);
        // camera.keysRight.push(68);
        var light = new BABYLON.PointLight("pointLight", new BABYLON.Vector3(0,10,-10), scene);
        light.diffuse = new BABYLON.Color3(1,0,0);

        scene.actionManager = new BABYLON.ActionManger(scene);
        scene.actionManager.registerAction(
            new BABYLON.ExecuteCodeAction({trigger: BABYLON.ActionManager.OnKeyUpTrigger, parameter: " "},
            function(){
                light.setEnabled(!light.isEnabled());
            })
        )
        return scene;
    }

    var scene = createScene();
    engine.runRenderLoop(function(){
        scene.getMeshByName("Box").position.z -= 0.01;
        scene.render();
    });


});
