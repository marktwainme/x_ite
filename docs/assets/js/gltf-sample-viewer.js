// EnvironmentLight

const ibl_files = [
   "ABeautifulGame",
   "AlphaBlendModeTest",
   "AnimatedCube",
   "Anisotropy",
   "AntiqueCamera",
   "AttenuationTest",
   "BarramundiFish",
   "BlackDragon",
   "Bonsai",
   "BoomBox",
   "Box With Spaces",
   "CarbonFibre",
   "ChairDamaskPurplegold",
   "Clearcoat",
   "ClearCoat",
   "Cube",
   "DamagedHelmet",
   "Dispersion",
   "DragonAttenuation",
   "EmissiveStrengthTest",
   "EnvironmentTest",
   "GlassBrokenWindow",
   "GlassHurricaneCandleHolder",
   "GlassVaseFlowers",
   "GunBot",
   "IORTestGrid",
   "Iridescence",
   "Iridescent",
   "Lantern",
   "MandarinOrange",
   "MaterialsVariantsShoe",
   "MetalRoughSpheres",
   "MosquitoInAmber",
   "NegativeScaleTest",
   "NeilArmstrong",
   "NormalTangentMirrorTest",
   "NormalTangentTest",
   "PotOfCoals",
   "Sheen",
   "SimpleInstancing",
   "SpecGlossVsMetalRough",
   "Specular",
   "Suzanne",
   "TextureEncodingTest",
   "TextureTransformMultiTest",
   "ToyCar",
   "Transmission",
   "Walking Alien",
   "WaterBottle",
   "YetiWarrior",
];

// TESTS_BEGIN

const models = [
   "https://create3000.github.io/media/glTF/Animated Bee/Animated Bee.glb",
   "https://create3000.github.io/media/glTF/BlackDragon/BlackDragon.glb",
   "https://create3000.github.io/media/glTF/Bonsai 1/Bonsai 1.gltf",
   "https://create3000.github.io/media/glTF/Bus Stop 1/Bus Stop 1.gltf",
   "https://create3000.github.io/media/glTF/FurInstancing/FurInstancing.glb",
   "https://create3000.github.io/media/glTF/GunBot/GunBot.glb",
   "https://create3000.github.io/media/glTF/NeilArmstrong/NeilArmstrong.glb",
   "https://create3000.github.io/media/glTF/Walking Alien/Walking Alien.gltf",
   "https://create3000.github.io/media/glTF/WebP/WebP.gltf",
   "https://create3000.github.io/media/glTF/YetiWarrior/YetiWarrior.gltf",
];

const glTF = [
   "https://raw.githubusercontent.com/KhronosGroup/glTF-Sample-Models/master/2.0/2CylinderEngine/glTF/2CylinderEngine.gltf",
   "https://raw.githubusercontent.com/KhronosGroup/glTF-Sample-Models/master/2.0/ABeautifulGame/glTF/ABeautifulGame.gltf",
   "https://raw.githubusercontent.com/KhronosGroup/glTF-Sample-Models/master/2.0/AlphaBlendModeTest/glTF/AlphaBlendModeTest.gltf",
   "https://raw.githubusercontent.com/KhronosGroup/glTF-Sample-Models/master/2.0/AnimatedCube/glTF/AnimatedCube.gltf",
   "https://raw.githubusercontent.com/KhronosGroup/glTF-Sample-Models/master/2.0/AnimatedMorphCube/glTF/AnimatedMorphCube.gltf",
   "https://raw.githubusercontent.com/KhronosGroup/glTF-Sample-Models/master/2.0/AnimatedMorphSphere/glTF/AnimatedMorphSphere.gltf",
   "https://raw.githubusercontent.com/KhronosGroup/glTF-Sample-Models/master/2.0/AnimatedTriangle/glTF/AnimatedTriangle.gltf",
   "https://raw.githubusercontent.com/KhronosGroup/glTF-Sample-Models/master/2.0/AntiqueCamera/glTF/AntiqueCamera.gltf",
   "https://raw.githubusercontent.com/KhronosGroup/glTF-Sample-Models/master/2.0/AttenuationTest/glTF/AttenuationTest.gltf",
   "https://raw.githubusercontent.com/KhronosGroup/glTF-Sample-Models/master/2.0/Avocado/glTF/Avocado.gltf",
   "https://raw.githubusercontent.com/KhronosGroup/glTF-Sample-Models/master/2.0/BarramundiFish/glTF/BarramundiFish.gltf",
   "https://raw.githubusercontent.com/KhronosGroup/glTF-Sample-Models/master/2.0/BoomBox/glTF/BoomBox.gltf",
   "https://raw.githubusercontent.com/KhronosGroup/glTF-Sample-Models/master/2.0/BoomBoxWithAxes/glTF/BoomBoxWithAxes.gltf",
   "https://raw.githubusercontent.com/KhronosGroup/glTF-Sample-Models/master/2.0/Box With Spaces/glTF/Box With Spaces.gltf",
   "https://raw.githubusercontent.com/KhronosGroup/glTF-Sample-Models/master/2.0/Box/glTF/Box.gltf",
   "https://raw.githubusercontent.com/KhronosGroup/glTF-Sample-Models/master/2.0/BoxAnimated/glTF/BoxAnimated.gltf",
   "https://raw.githubusercontent.com/KhronosGroup/glTF-Sample-Models/master/2.0/BoxInterleaved/glTF/BoxInterleaved.gltf",
   "https://raw.githubusercontent.com/KhronosGroup/glTF-Sample-Models/master/2.0/BoxTextured/glTF/BoxTextured.gltf",
   "https://raw.githubusercontent.com/KhronosGroup/glTF-Sample-Models/master/2.0/BoxTexturedNonPowerOfTwo/glTF/BoxTexturedNonPowerOfTwo.gltf",
   "https://raw.githubusercontent.com/KhronosGroup/glTF-Sample-Models/master/2.0/BoxVertexColors/glTF/BoxVertexColors.gltf",
   "https://raw.githubusercontent.com/KhronosGroup/glTF-Sample-Models/master/2.0/BrainStem/glTF/BrainStem.gltf",
   "https://raw.githubusercontent.com/KhronosGroup/glTF-Sample-Models/master/2.0/Buggy/glTF/Buggy.gltf",
   "https://raw.githubusercontent.com/KhronosGroup/glTF-Sample-Models/master/2.0/Cameras/glTF/Cameras.gltf",
   "https://raw.githubusercontent.com/KhronosGroup/glTF-Sample-Models/master/2.0/CarbonFibre/glTF/CarbonFibre.gltf",
   "https://raw.githubusercontent.com/KhronosGroup/glTF-Sample-Models/master/2.0/CesiumMan/glTF/CesiumMan.gltf",
   "https://raw.githubusercontent.com/KhronosGroup/glTF-Sample-Models/master/2.0/CesiumMilkTruck/glTF/CesiumMilkTruck.gltf",
   "https://raw.githubusercontent.com/KhronosGroup/glTF-Sample-Models/master/2.0/ClearCoatCarPaint/glTF/ClearCoatCarPaint.gltf",
   "https://raw.githubusercontent.com/KhronosGroup/glTF-Sample-Models/master/2.0/ClearCoatTest/glTF/ClearCoatTest.gltf",
   "https://raw.githubusercontent.com/KhronosGroup/glTF-Sample-Models/master/2.0/ClearcoatRing/glTF/ClearcoatRing.gltf",
   "https://raw.githubusercontent.com/KhronosGroup/glTF-Sample-Models/master/2.0/ClearcoatSphere/glTF/ClearcoatSphere.gltf",
   "https://raw.githubusercontent.com/KhronosGroup/glTF-Sample-Models/master/2.0/ClearcoatWicker/glTF/ClearcoatWicker.gltf",
   "https://raw.githubusercontent.com/KhronosGroup/glTF-Sample-Models/master/2.0/Corset/glTF/Corset.gltf",
   "https://raw.githubusercontent.com/KhronosGroup/glTF-Sample-Models/master/2.0/Cube/glTF/Cube.gltf",
   "https://raw.githubusercontent.com/KhronosGroup/glTF-Sample-Models/master/2.0/DamagedHelmet/glTF/DamagedHelmet.gltf",
   "https://raw.githubusercontent.com/KhronosGroup/glTF-Sample-Models/master/2.0/DirectionalLight/glTF/DirectionalLight.gltf",
   "https://raw.githubusercontent.com/KhronosGroup/glTF-Sample-Models/master/2.0/DragonAttenuation/glTF/DragonAttenuation.gltf",
   "https://raw.githubusercontent.com/KhronosGroup/glTF-Sample-Models/master/2.0/Duck/glTF/Duck.gltf",
   "https://raw.githubusercontent.com/KhronosGroup/glTF-Sample-Models/master/2.0/EmissiveStrengthTest/glTF/EmissiveStrengthTest.gltf",
   "https://raw.githubusercontent.com/KhronosGroup/glTF-Sample-Models/master/2.0/EnvironmentTest/glTF/EnvironmentTest.gltf",
   "https://raw.githubusercontent.com/KhronosGroup/glTF-Sample-Models/master/2.0/FlightHelmet/glTF/FlightHelmet.gltf",
   "https://raw.githubusercontent.com/KhronosGroup/glTF-Sample-Models/master/2.0/Fox/glTF/Fox.gltf",
   "https://raw.githubusercontent.com/KhronosGroup/glTF-Sample-Models/master/2.0/GearboxAssy/glTF/GearboxAssy.gltf",
   "https://raw.githubusercontent.com/KhronosGroup/glTF-Sample-Models/master/2.0/GlamVelvetSofa/glTF/GlamVelvetSofa.gltf",
   "https://raw.githubusercontent.com/KhronosGroup/glTF-Sample-Models/master/2.0/InterpolationTest/glTF/InterpolationTest.gltf",
   "https://raw.githubusercontent.com/KhronosGroup/glTF-Sample-Models/master/2.0/IridescenceDielectricSpheres/glTF/IridescenceDielectricSpheres.gltf",
   "https://raw.githubusercontent.com/KhronosGroup/glTF-Sample-Models/master/2.0/IridescenceLamp/glTF/IridescenceLamp.gltf",
   "https://raw.githubusercontent.com/KhronosGroup/glTF-Sample-Models/master/2.0/IridescenceMetallicSpheres/glTF/IridescenceMetallicSpheres.gltf",
   "https://raw.githubusercontent.com/KhronosGroup/glTF-Sample-Models/master/2.0/IridescenceSuzanne/glTF/IridescenceSuzanne.gltf",
   "https://raw.githubusercontent.com/KhronosGroup/glTF-Sample-Models/master/2.0/IridescentDishWithOlives/glTF/IridescentDishWithOlives.gltf",
   "https://raw.githubusercontent.com/KhronosGroup/glTF-Sample-Models/master/2.0/Lantern/glTF/Lantern.gltf",
   "https://raw.githubusercontent.com/KhronosGroup/glTF-Sample-Models/master/2.0/LightsPunctualLamp/glTF/LightsPunctualLamp.gltf",
   "https://raw.githubusercontent.com/KhronosGroup/glTF-Sample-Models/master/2.0/MaterialsVariantsShoe/glTF/MaterialsVariantsShoe.gltf",
   "https://raw.githubusercontent.com/KhronosGroup/glTF-Sample-Models/master/2.0/MeshPrimitiveModes/glTF/MeshPrimitiveModes.gltf",
   "https://raw.githubusercontent.com/KhronosGroup/glTF-Sample-Models/master/2.0/MetalRoughSpheres/glTF/MetalRoughSpheres.gltf",
   "https://raw.githubusercontent.com/KhronosGroup/glTF-Sample-Models/master/2.0/MetalRoughSpheresNoTextures/glTF/MetalRoughSpheresNoTextures.gltf",
   "https://raw.githubusercontent.com/KhronosGroup/glTF-Sample-Models/master/2.0/MorphPrimitivesTest/glTF/MorphPrimitivesTest.gltf",
   "https://raw.githubusercontent.com/KhronosGroup/glTF-Sample-Models/master/2.0/MorphStressTest/glTF/MorphStressTest.gltf",
   "https://raw.githubusercontent.com/KhronosGroup/glTF-Sample-Models/master/2.0/MosquitoInAmber/glTF/MosquitoInAmber.gltf",
   "https://raw.githubusercontent.com/KhronosGroup/glTF-Sample-Models/master/2.0/MultiUVTest/glTF/MultiUVTest.gltf",
   "https://raw.githubusercontent.com/KhronosGroup/glTF-Sample-Models/master/2.0/MultipleScenes/glTF/MultipleScenes.gltf",
   "https://raw.githubusercontent.com/KhronosGroup/glTF-Sample-Models/master/2.0/NegativeScaleTest/glTF/NegativeScaleTest.gltf",
   "https://raw.githubusercontent.com/KhronosGroup/glTF-Sample-Models/master/2.0/NormalTangentMirrorTest/glTF/NormalTangentMirrorTest.gltf",
   "https://raw.githubusercontent.com/KhronosGroup/glTF-Sample-Models/master/2.0/NormalTangentTest/glTF/NormalTangentTest.gltf",
   "https://raw.githubusercontent.com/KhronosGroup/glTF-Sample-Models/master/2.0/OrientationTest/glTF/OrientationTest.gltf",
   "https://raw.githubusercontent.com/KhronosGroup/glTF-Sample-Models/master/2.0/PrimitiveModeNormalsTest/glTF/PrimitiveModeNormalsTest.gltf",
   "https://raw.githubusercontent.com/KhronosGroup/glTF-Sample-Models/master/2.0/ReciprocatingSaw/glTF/ReciprocatingSaw.gltf",
   "https://raw.githubusercontent.com/KhronosGroup/glTF-Sample-Models/master/2.0/RecursiveSkeletons/glTF/RecursiveSkeletons.gltf",
   "https://raw.githubusercontent.com/KhronosGroup/glTF-Sample-Models/master/2.0/RiggedFigure/glTF/RiggedFigure.gltf",
   "https://raw.githubusercontent.com/KhronosGroup/glTF-Sample-Models/master/2.0/RiggedSimple/glTF/RiggedSimple.gltf",
   "https://raw.githubusercontent.com/KhronosGroup/glTF-Sample-Models/master/2.0/SciFiHelmet/glTF/SciFiHelmet.gltf",
   "https://raw.githubusercontent.com/KhronosGroup/glTF-Sample-Models/master/2.0/SheenChair/glTF/SheenChair.gltf",
   "https://raw.githubusercontent.com/KhronosGroup/glTF-Sample-Models/master/2.0/SheenCloth/glTF/SheenCloth.gltf",
   "https://raw.githubusercontent.com/KhronosGroup/glTF-Sample-Models/master/2.0/SheenDamask/glTF/SheenDamask.gltf",
   "https://raw.githubusercontent.com/KhronosGroup/glTF-Sample-Models/master/2.0/SheenHighHeel/glTF/SheenHighHeel.gltf",
   "https://raw.githubusercontent.com/KhronosGroup/glTF-Sample-Models/master/2.0/SimpleInstancing/glTF/SimpleInstancing.gltf",
   "https://raw.githubusercontent.com/KhronosGroup/glTF-Sample-Models/master/2.0/SimpleMeshes/glTF/SimpleMeshes.gltf",
   "https://raw.githubusercontent.com/KhronosGroup/glTF-Sample-Models/master/2.0/SimpleMorph/glTF/SimpleMorph.gltf",
   "https://raw.githubusercontent.com/KhronosGroup/glTF-Sample-Models/master/2.0/SimpleSkin/glTF/SimpleSkin.gltf",
   "https://raw.githubusercontent.com/KhronosGroup/glTF-Sample-Models/master/2.0/SimpleSparseAccessor/glTF/SimpleSparseAccessor.gltf",
   "https://raw.githubusercontent.com/KhronosGroup/glTF-Sample-Models/master/2.0/SpecGlossVsMetalRough/glTF/SpecGlossVsMetalRough.gltf",
   "https://raw.githubusercontent.com/KhronosGroup/glTF-Sample-Models/master/2.0/SpecularTest/glTF/SpecularTest.gltf",
   "https://raw.githubusercontent.com/KhronosGroup/glTF-Sample-Models/master/2.0/Sponza/glTF/Sponza.gltf",
   "https://raw.githubusercontent.com/KhronosGroup/glTF-Sample-Models/master/2.0/StainedGlassLamp/glTF/StainedGlassLamp.gltf",
   "https://raw.githubusercontent.com/KhronosGroup/glTF-Sample-Models/master/2.0/Suzanne/glTF/Suzanne.gltf",
   "https://raw.githubusercontent.com/KhronosGroup/glTF-Sample-Models/master/2.0/SuzanneMorphSparse/glTF/SuzanneMorphSparse.gltf",
   "https://raw.githubusercontent.com/KhronosGroup/glTF-Sample-Models/master/2.0/TextureCoordinateTest/glTF/TextureCoordinateTest.gltf",
   "https://raw.githubusercontent.com/KhronosGroup/glTF-Sample-Models/master/2.0/TextureEncodingTest/glTF/TextureEncodingTest.gltf",
   "https://raw.githubusercontent.com/KhronosGroup/glTF-Sample-Models/master/2.0/TextureLinearInterpolationTest/glTF/TextureLinearInterpolationTest.gltf",
   "https://raw.githubusercontent.com/KhronosGroup/glTF-Sample-Models/master/2.0/TextureSettingsTest/glTF/TextureSettingsTest.gltf",
   "https://raw.githubusercontent.com/KhronosGroup/glTF-Sample-Models/master/2.0/TextureTransformMultiTest/glTF/TextureTransformMultiTest.gltf",
   "https://raw.githubusercontent.com/KhronosGroup/glTF-Sample-Models/master/2.0/TextureTransformTest/glTF/TextureTransformTest.gltf",
   "https://raw.githubusercontent.com/KhronosGroup/glTF-Sample-Models/master/2.0/ToyCar/glTF/ToyCar.gltf",
   "https://raw.githubusercontent.com/KhronosGroup/glTF-Sample-Models/master/2.0/TransmissionRoughnessTest/glTF/TransmissionRoughnessTest.gltf",
   "https://raw.githubusercontent.com/KhronosGroup/glTF-Sample-Models/master/2.0/TransmissionSuzanne/glTF/TransmissionSuzanne.gltf",
   "https://raw.githubusercontent.com/KhronosGroup/glTF-Sample-Models/master/2.0/TransmissionTest/glTF/TransmissionTest.gltf",
   "https://raw.githubusercontent.com/KhronosGroup/glTF-Sample-Models/master/2.0/Triangle/glTF/Triangle.gltf",
   "https://raw.githubusercontent.com/KhronosGroup/glTF-Sample-Models/master/2.0/TriangleWithoutIndices/glTF/TriangleWithoutIndices.gltf",
   "https://raw.githubusercontent.com/KhronosGroup/glTF-Sample-Models/master/2.0/TwoSidedPlane/glTF/TwoSidedPlane.gltf",
   "https://raw.githubusercontent.com/KhronosGroup/glTF-Sample-Models/master/2.0/Unicode❤♻Test/glTF/Unicode❤♻Test.gltf",
   "https://raw.githubusercontent.com/KhronosGroup/glTF-Sample-Models/master/2.0/UnlitTest/glTF/UnlitTest.gltf",
   "https://raw.githubusercontent.com/KhronosGroup/glTF-Sample-Models/master/2.0/VC/glTF/VC.gltf",
   "https://raw.githubusercontent.com/KhronosGroup/glTF-Sample-Models/master/2.0/VertexColorTest/glTF/VertexColorTest.gltf",
   "https://raw.githubusercontent.com/KhronosGroup/glTF-Sample-Models/master/2.0/WaterBottle/glTF/WaterBottle.gltf",
   "https://raw.githubusercontent.com/KhronosGroup/glTF-Sample-Models/master/2.0/XmpMetadataRoundedCube/glTF/xmp.gltf",
   "https://raw.githubusercontent.com/KhronosGroup/glTF-Sample-Assets/master/Models/ABeautifulGame/glTF/ABeautifulGame.gltf",
   "https://raw.githubusercontent.com/KhronosGroup/glTF-Sample-Assets/master/Models/AlphaBlendModeTest/glTF/AlphaBlendModeTest.gltf",
   "https://raw.githubusercontent.com/KhronosGroup/glTF-Sample-Assets/master/Models/AnimatedCube/glTF/AnimatedCube.gltf",
   "https://raw.githubusercontent.com/KhronosGroup/glTF-Sample-Assets/master/Models/AnimatedMorphCube/glTF/AnimatedMorphCube.gltf",
   "https://raw.githubusercontent.com/KhronosGroup/glTF-Sample-Assets/master/Models/AnimatedTriangle/glTF/AnimatedTriangle.gltf",
   "https://raw.githubusercontent.com/KhronosGroup/glTF-Sample-Assets/master/Models/AnisotropyBarnLamp/glTF/AnisotropyBarnLamp.gltf",
   "https://raw.githubusercontent.com/KhronosGroup/glTF-Sample-Assets/master/Models/AnisotropyDiscTest/glTF/AnisotropyDiscTest.gltf",
   "https://raw.githubusercontent.com/KhronosGroup/glTF-Sample-Assets/master/Models/AnisotropyRotationTest/glTF/AnisotropyRotationTest.gltf",
   "https://raw.githubusercontent.com/KhronosGroup/glTF-Sample-Assets/master/Models/AnisotropyStrengthTest/glTF/AnisotropyStrengthTest.gltf",
   "https://raw.githubusercontent.com/KhronosGroup/glTF-Sample-Assets/master/Models/AntiqueCamera/glTF/AntiqueCamera.gltf",
   "https://raw.githubusercontent.com/KhronosGroup/glTF-Sample-Assets/master/Models/AttenuationTest/glTF/AttenuationTest.gltf",
   "https://raw.githubusercontent.com/KhronosGroup/glTF-Sample-Assets/master/Models/Avocado/glTF/Avocado.gltf",
   "https://raw.githubusercontent.com/KhronosGroup/glTF-Sample-Assets/master/Models/BarramundiFish/glTF/BarramundiFish.gltf",
   "https://raw.githubusercontent.com/KhronosGroup/glTF-Sample-Assets/master/Models/BoomBox/glTF/BoomBox.gltf",
   "https://raw.githubusercontent.com/KhronosGroup/glTF-Sample-Assets/master/Models/BoomBoxWithAxes/glTF/BoomBoxWithAxes.gltf",
   "https://raw.githubusercontent.com/KhronosGroup/glTF-Sample-Assets/master/Models/Box With Spaces/glTF/Box With Spaces.gltf",
   "https://raw.githubusercontent.com/KhronosGroup/glTF-Sample-Assets/master/Models/Box/glTF/Box.gltf",
   "https://raw.githubusercontent.com/KhronosGroup/glTF-Sample-Assets/master/Models/BoxAnimated/glTF/BoxAnimated.gltf",
   "https://raw.githubusercontent.com/KhronosGroup/glTF-Sample-Assets/master/Models/BoxInterleaved/glTF/BoxInterleaved.gltf",
   "https://raw.githubusercontent.com/KhronosGroup/glTF-Sample-Assets/master/Models/BoxTextured/glTF/BoxTextured.gltf",
   "https://raw.githubusercontent.com/KhronosGroup/glTF-Sample-Assets/master/Models/BoxTexturedNonPowerOfTwo/glTF/BoxTexturedNonPowerOfTwo.gltf",
   "https://raw.githubusercontent.com/KhronosGroup/glTF-Sample-Assets/master/Models/BoxVertexColors/glTF/BoxVertexColors.gltf",
   "https://raw.githubusercontent.com/KhronosGroup/glTF-Sample-Assets/master/Models/BrainStem/glTF/BrainStem.gltf",
   "https://raw.githubusercontent.com/KhronosGroup/glTF-Sample-Assets/master/Models/Cameras/glTF/Cameras.gltf",
   "https://raw.githubusercontent.com/KhronosGroup/glTF-Sample-Assets/master/Models/CarbonFibre/glTF/CarbonFibre.gltf",
   "https://raw.githubusercontent.com/KhronosGroup/glTF-Sample-Assets/master/Models/CesiumMan/glTF/CesiumMan.gltf",
   "https://raw.githubusercontent.com/KhronosGroup/glTF-Sample-Assets/master/Models/CesiumMilkTruck/glTF/CesiumMilkTruck.gltf",
   "https://raw.githubusercontent.com/KhronosGroup/glTF-Sample-Assets/master/Models/ChairDamaskPurplegold/glTF/ChairDamaskPurplegold.gltf",
   "https://raw.githubusercontent.com/KhronosGroup/glTF-Sample-Assets/master/Models/ClearCoatCarPaint/glTF/ClearCoatCarPaint.gltf",
   "https://raw.githubusercontent.com/KhronosGroup/glTF-Sample-Assets/master/Models/ClearCoatTest/glTF/ClearCoatTest.gltf",
   "https://raw.githubusercontent.com/KhronosGroup/glTF-Sample-Assets/master/Models/ClearcoatWicker/glTF/ClearcoatWicker.gltf",
   "https://raw.githubusercontent.com/KhronosGroup/glTF-Sample-Assets/master/Models/Corset/glTF/Corset.gltf",
   "https://raw.githubusercontent.com/KhronosGroup/glTF-Sample-Assets/master/Models/Cube/glTF/Cube.gltf",
   "https://raw.githubusercontent.com/KhronosGroup/glTF-Sample-Assets/master/Models/DamagedHelmet/glTF/DamagedHelmet.gltf",
   "https://raw.githubusercontent.com/KhronosGroup/glTF-Sample-Assets/master/Models/DiffuseTransmissionPlant/glTF/DiffuseTransmissionPlant.gltf",
   "https://raw.githubusercontent.com/KhronosGroup/glTF-Sample-Assets/master/Models/DiffuseTransmissionTeacup/glTF/DiffuseTransmissionTeacup.gltf",
   "https://raw.githubusercontent.com/KhronosGroup/glTF-Sample-Assets/master/Models/DirectionalLight/glTF/DirectionalLight.gltf",
   "https://raw.githubusercontent.com/KhronosGroup/glTF-Sample-Assets/master/Models/DispersionTest/glTF/DispersionTest.gltf",
   "https://raw.githubusercontent.com/KhronosGroup/glTF-Sample-Assets/master/Models/DragonAttenuation/glTF/DragonAttenuation.gltf",
   "https://raw.githubusercontent.com/KhronosGroup/glTF-Sample-Assets/master/Models/DragonDispersion/glTF/DragonDispersion.gltf",
   "https://raw.githubusercontent.com/KhronosGroup/glTF-Sample-Assets/master/Models/Duck/glTF/Duck.gltf",
   "https://raw.githubusercontent.com/KhronosGroup/glTF-Sample-Assets/master/Models/EmissiveStrengthTest/glTF/EmissiveStrengthTest.gltf",
   "https://raw.githubusercontent.com/KhronosGroup/glTF-Sample-Assets/master/Models/EnvironmentTest/glTF/EnvironmentTest.gltf",
   "https://raw.githubusercontent.com/KhronosGroup/glTF-Sample-Assets/master/Models/FlightHelmet/glTF/FlightHelmet.gltf",
   "https://raw.githubusercontent.com/KhronosGroup/glTF-Sample-Assets/master/Models/Fox/glTF/Fox.gltf",
   "https://raw.githubusercontent.com/KhronosGroup/glTF-Sample-Assets/master/Models/GlamVelvetSofa/glTF/GlamVelvetSofa.gltf",
   "https://raw.githubusercontent.com/KhronosGroup/glTF-Sample-Assets/master/Models/GlassBrokenWindow/glTF/GlassBrokenWindow.gltf",
   "https://raw.githubusercontent.com/KhronosGroup/glTF-Sample-Assets/master/Models/GlassHurricaneCandleHolder/glTF/GlassHurricaneCandleHolder.gltf",
   "https://raw.githubusercontent.com/KhronosGroup/glTF-Sample-Assets/master/Models/GlassVaseFlowers/glTF/GlassVaseFlowers.gltf",
   "https://raw.githubusercontent.com/KhronosGroup/glTF-Sample-Assets/master/Models/IORTestGrid/glTF/IORTestGrid.gltf",
   "https://raw.githubusercontent.com/KhronosGroup/glTF-Sample-Assets/master/Models/InterpolationTest/glTF/InterpolationTest.gltf",
   "https://raw.githubusercontent.com/KhronosGroup/glTF-Sample-Assets/master/Models/IridescenceAbalone/glTF/IridescenceAbalone.gltf",
   "https://raw.githubusercontent.com/KhronosGroup/glTF-Sample-Assets/master/Models/IridescenceDielectricSpheres/glTF/IridescenceDielectricSpheres.gltf",
   "https://raw.githubusercontent.com/KhronosGroup/glTF-Sample-Assets/master/Models/IridescenceLamp/glTF/IridescenceLamp.gltf",
   "https://raw.githubusercontent.com/KhronosGroup/glTF-Sample-Assets/master/Models/IridescenceMetallicSpheres/glTF/IridescenceMetallicSpheres.gltf",
   "https://raw.githubusercontent.com/KhronosGroup/glTF-Sample-Assets/master/Models/IridescenceSuzanne/glTF/IridescenceSuzanne.gltf",
   "https://raw.githubusercontent.com/KhronosGroup/glTF-Sample-Assets/master/Models/IridescentDishWithOlives/glTF/IridescentDishWithOlives.gltf",
   "https://raw.githubusercontent.com/KhronosGroup/glTF-Sample-Assets/master/Models/Lantern/glTF/Lantern.gltf",
   "https://raw.githubusercontent.com/KhronosGroup/glTF-Sample-Assets/master/Models/LightsPunctualLamp/glTF/LightsPunctualLamp.gltf",
   "https://raw.githubusercontent.com/KhronosGroup/glTF-Sample-Assets/master/Models/MandarinOrange/glTF/MandarinOrange.gltf",
   "https://raw.githubusercontent.com/KhronosGroup/glTF-Sample-Assets/master/Models/MaterialsVariantsShoe/glTF/MaterialsVariantsShoe.gltf",
   "https://raw.githubusercontent.com/KhronosGroup/glTF-Sample-Assets/master/Models/MeshPrimitiveModes/glTF/MeshPrimitiveModes.gltf",
   "https://raw.githubusercontent.com/KhronosGroup/glTF-Sample-Assets/master/Models/MetalRoughSpheres/glTF/MetalRoughSpheres.gltf",
   "https://raw.githubusercontent.com/KhronosGroup/glTF-Sample-Assets/master/Models/MetalRoughSpheresNoTextures/glTF/MetalRoughSpheresNoTextures.gltf",
   "https://raw.githubusercontent.com/KhronosGroup/glTF-Sample-Assets/master/Models/MorphPrimitivesTest/glTF/MorphPrimitivesTest.gltf",
   "https://raw.githubusercontent.com/KhronosGroup/glTF-Sample-Assets/master/Models/MorphStressTest/glTF/MorphStressTest.gltf",
   "https://raw.githubusercontent.com/KhronosGroup/glTF-Sample-Assets/master/Models/MosquitoInAmber/glTF/MosquitoInAmber.gltf",
   "https://raw.githubusercontent.com/KhronosGroup/glTF-Sample-Assets/master/Models/MultiUVTest/glTF/MultiUVTest.gltf",
   "https://raw.githubusercontent.com/KhronosGroup/glTF-Sample-Assets/master/Models/MultipleScenes/glTF/MultipleScenes.gltf",
   "https://raw.githubusercontent.com/KhronosGroup/glTF-Sample-Assets/master/Models/NegativeScaleTest/glTF/NegativeScaleTest.gltf",
   "https://raw.githubusercontent.com/KhronosGroup/glTF-Sample-Assets/master/Models/NormalTangentMirrorTest/glTF/NormalTangentMirrorTest.gltf",
   "https://raw.githubusercontent.com/KhronosGroup/glTF-Sample-Assets/master/Models/NormalTangentTest/glTF/NormalTangentTest.gltf",
   "https://raw.githubusercontent.com/KhronosGroup/glTF-Sample-Assets/master/Models/OrientationTest/glTF/OrientationTest.gltf",
   "https://raw.githubusercontent.com/KhronosGroup/glTF-Sample-Assets/master/Models/PotOfCoals/glTF/PotOfCoals.gltf",
   "https://raw.githubusercontent.com/KhronosGroup/glTF-Sample-Assets/master/Models/PrimitiveModeNormalsTest/glTF/PrimitiveModeNormalsTest.gltf",
   "https://raw.githubusercontent.com/KhronosGroup/glTF-Sample-Assets/master/Models/RecursiveSkeletons/glTF/RecursiveSkeletons.gltf",
   "https://raw.githubusercontent.com/KhronosGroup/glTF-Sample-Assets/master/Models/RiggedFigure/glTF/RiggedFigure.gltf",
   "https://raw.githubusercontent.com/KhronosGroup/glTF-Sample-Assets/master/Models/RiggedSimple/glTF/RiggedSimple.gltf",
   "https://raw.githubusercontent.com/KhronosGroup/glTF-Sample-Assets/master/Models/SciFiHelmet/glTF/SciFiHelmet.gltf",
   "https://raw.githubusercontent.com/KhronosGroup/glTF-Sample-Assets/master/Models/SheenChair/glTF/SheenChair.gltf",
   "https://raw.githubusercontent.com/KhronosGroup/glTF-Sample-Assets/master/Models/SheenCloth/glTF/SheenCloth.gltf",
   "https://raw.githubusercontent.com/KhronosGroup/glTF-Sample-Assets/master/Models/SheenTestGrid/glTF/SheenTestGrid.gltf",
   "https://raw.githubusercontent.com/KhronosGroup/glTF-Sample-Assets/master/Models/SimpleInstancing/glTF/SimpleInstancing.gltf",
   "https://raw.githubusercontent.com/KhronosGroup/glTF-Sample-Assets/master/Models/SimpleMaterial/glTF/SimpleMaterial.gltf",
   "https://raw.githubusercontent.com/KhronosGroup/glTF-Sample-Assets/master/Models/SimpleMeshes/glTF/SimpleMeshes.gltf",
   "https://raw.githubusercontent.com/KhronosGroup/glTF-Sample-Assets/master/Models/SimpleMorph/glTF/SimpleMorph.gltf",
   "https://raw.githubusercontent.com/KhronosGroup/glTF-Sample-Assets/master/Models/SimpleSkin/glTF/SimpleSkin.gltf",
   "https://raw.githubusercontent.com/KhronosGroup/glTF-Sample-Assets/master/Models/SimpleSparseAccessor/glTF/SimpleSparseAccessor.gltf",
   "https://raw.githubusercontent.com/KhronosGroup/glTF-Sample-Assets/master/Models/SimpleTexture/glTF/SimpleTexture.gltf",
   "https://raw.githubusercontent.com/KhronosGroup/glTF-Sample-Assets/master/Models/SpecGlossVsMetalRough/glTF/SpecGlossVsMetalRough.gltf",
   "https://raw.githubusercontent.com/KhronosGroup/glTF-Sample-Assets/master/Models/SpecularSilkPouf/glTF/SpecularSilkPouf.gltf",
   "https://raw.githubusercontent.com/KhronosGroup/glTF-Sample-Assets/master/Models/SpecularTest/glTF/SpecularTest.gltf",
   "https://raw.githubusercontent.com/KhronosGroup/glTF-Sample-Assets/master/Models/Sponza/glTF/Sponza.gltf",
   "https://raw.githubusercontent.com/KhronosGroup/glTF-Sample-Assets/master/Models/StainedGlassLamp/glTF/StainedGlassLamp.gltf",
   "https://raw.githubusercontent.com/KhronosGroup/glTF-Sample-Assets/master/Models/Suzanne/glTF/Suzanne.gltf",
   "https://raw.githubusercontent.com/KhronosGroup/glTF-Sample-Assets/master/Models/TextureCoordinateTest/glTF/TextureCoordinateTest.gltf",
   "https://raw.githubusercontent.com/KhronosGroup/glTF-Sample-Assets/master/Models/TextureEncodingTest/glTF/TextureEncodingTest.gltf",
   "https://raw.githubusercontent.com/KhronosGroup/glTF-Sample-Assets/master/Models/TextureLinearInterpolationTest/glTF/TextureLinearInterpolationTest.gltf",
   "https://raw.githubusercontent.com/KhronosGroup/glTF-Sample-Assets/master/Models/TextureSettingsTest/glTF/TextureSettingsTest.gltf",
   "https://raw.githubusercontent.com/KhronosGroup/glTF-Sample-Assets/master/Models/TextureTransformMultiTest/glTF/TextureTransformMultiTest.gltf",
   "https://raw.githubusercontent.com/KhronosGroup/glTF-Sample-Assets/master/Models/TextureTransformTest/glTF/TextureTransformTest.gltf",
   "https://raw.githubusercontent.com/KhronosGroup/glTF-Sample-Assets/master/Models/ToyCar/glTF/ToyCar.gltf",
   "https://raw.githubusercontent.com/KhronosGroup/glTF-Sample-Assets/master/Models/TransmissionRoughnessTest/glTF/TransmissionRoughnessTest.gltf",
   "https://raw.githubusercontent.com/KhronosGroup/glTF-Sample-Assets/master/Models/TransmissionTest/glTF/TransmissionTest.gltf",
   "https://raw.githubusercontent.com/KhronosGroup/glTF-Sample-Assets/master/Models/TransmissionThinwallTestGrid/glTF/TransmissionThinwallTestGrid.gltf",
   "https://raw.githubusercontent.com/KhronosGroup/glTF-Sample-Assets/master/Models/Triangle/glTF/Triangle.gltf",
   "https://raw.githubusercontent.com/KhronosGroup/glTF-Sample-Assets/master/Models/TriangleWithoutIndices/glTF/TriangleWithoutIndices.gltf",
   "https://raw.githubusercontent.com/KhronosGroup/glTF-Sample-Assets/master/Models/TwoSidedPlane/glTF/TwoSidedPlane.gltf",
   "https://raw.githubusercontent.com/KhronosGroup/glTF-Sample-Assets/master/Models/Unicode❤♻Test/glTF/Unicode❤♻Test.gltf",
   "https://raw.githubusercontent.com/KhronosGroup/glTF-Sample-Assets/master/Models/UnlitTest/glTF/UnlitTest.gltf",
   "https://raw.githubusercontent.com/KhronosGroup/glTF-Sample-Assets/master/Models/VertexColorTest/glTF/VertexColorTest.gltf",
   "https://raw.githubusercontent.com/KhronosGroup/glTF-Sample-Assets/master/Models/VirtualCity/glTF/VirtualCity.gltf",
   "https://raw.githubusercontent.com/KhronosGroup/glTF-Sample-Assets/master/Models/WaterBottle/glTF/WaterBottle.gltf",
   "https://raw.githubusercontent.com/KhronosGroup/glTF-Sample-Assets/master/Models/XmpMetadataRoundedCube/glTF/XmpMetadataRoundedCube.gltf",
];

const glb = [
   "https://raw.githubusercontent.com/KhronosGroup/glTF-Sample-Models/master/2.0/2CylinderEngine/glTF-Binary/2CylinderEngine.glb",
   "https://raw.githubusercontent.com/KhronosGroup/glTF-Sample-Models/master/2.0/AlphaBlendModeTest/glTF-Binary/AlphaBlendModeTest.glb",
   "https://raw.githubusercontent.com/KhronosGroup/glTF-Sample-Models/master/2.0/AnimatedMorphCube/glTF-Binary/AnimatedMorphCube.glb",
   "https://raw.githubusercontent.com/KhronosGroup/glTF-Sample-Models/master/2.0/AnimatedMorphSphere/glTF-Binary/AnimatedMorphSphere.glb",
   "https://raw.githubusercontent.com/KhronosGroup/glTF-Sample-Models/master/2.0/AntiqueCamera/glTF-Binary/AntiqueCamera.glb",
   "https://raw.githubusercontent.com/KhronosGroup/glTF-Sample-Models/master/2.0/AttenuationTest/glTF-Binary/AttenuationTest.glb",
   "https://raw.githubusercontent.com/KhronosGroup/glTF-Sample-Models/master/2.0/Avocado/glTF-Binary/Avocado.glb",
   "https://raw.githubusercontent.com/KhronosGroup/glTF-Sample-Models/master/2.0/BarramundiFish/glTF-Binary/BarramundiFish.glb",
   "https://raw.githubusercontent.com/KhronosGroup/glTF-Sample-Models/master/2.0/BoomBox/glTF-Binary/BoomBox.glb",
   "https://raw.githubusercontent.com/KhronosGroup/glTF-Sample-Models/master/2.0/Box/glTF-Binary/Box.glb",
   "https://raw.githubusercontent.com/KhronosGroup/glTF-Sample-Models/master/2.0/BoxAnimated/glTF-Binary/BoxAnimated.glb",
   "https://raw.githubusercontent.com/KhronosGroup/glTF-Sample-Models/master/2.0/BoxInterleaved/glTF-Binary/BoxInterleaved.glb",
   "https://raw.githubusercontent.com/KhronosGroup/glTF-Sample-Models/master/2.0/BoxTextured/glTF-Binary/BoxTextured.glb",
   "https://raw.githubusercontent.com/KhronosGroup/glTF-Sample-Models/master/2.0/BoxTexturedNonPowerOfTwo/glTF-Binary/BoxTexturedNonPowerOfTwo.glb",
   "https://raw.githubusercontent.com/KhronosGroup/glTF-Sample-Models/master/2.0/BoxVertexColors/glTF-Binary/BoxVertexColors.glb",
   "https://raw.githubusercontent.com/KhronosGroup/glTF-Sample-Models/master/2.0/BrainStem/glTF-Binary/BrainStem.glb",
   "https://raw.githubusercontent.com/KhronosGroup/glTF-Sample-Models/master/2.0/Buggy/glTF-Binary/Buggy.glb",
   "https://raw.githubusercontent.com/KhronosGroup/glTF-Sample-Models/master/2.0/CarbonFibre/glTF-Binary/CarbonFibre.glb",
   "https://raw.githubusercontent.com/KhronosGroup/glTF-Sample-Models/master/2.0/CesiumMan/glTF-Binary/CesiumMan.glb",
   "https://raw.githubusercontent.com/KhronosGroup/glTF-Sample-Models/master/2.0/CesiumMilkTruck/glTF-Binary/CesiumMilkTruck.glb",
   "https://raw.githubusercontent.com/KhronosGroup/glTF-Sample-Models/master/2.0/ClearCoatCarPaint/glTF-Binary/ClearCoatCarPaint.glb",
   "https://raw.githubusercontent.com/KhronosGroup/glTF-Sample-Models/master/2.0/ClearCoatTest/glTF-Binary/ClearCoatTest.glb",
   "https://raw.githubusercontent.com/KhronosGroup/glTF-Sample-Models/master/2.0/ClearcoatWicker/glTF-Binary/ClearcoatWicker.glb",
   "https://raw.githubusercontent.com/KhronosGroup/glTF-Sample-Models/master/2.0/Corset/glTF-Binary/Corset.glb",
   "https://raw.githubusercontent.com/KhronosGroup/glTF-Sample-Models/master/2.0/DamagedHelmet/glTF-Binary/DamagedHelmet.glb",
   "https://raw.githubusercontent.com/KhronosGroup/glTF-Sample-Models/master/2.0/DirectionalLight/glTF-Binary/DirectionalLight.glb",
   "https://raw.githubusercontent.com/KhronosGroup/glTF-Sample-Models/master/2.0/DragonAttenuation/glTF-Binary/DragonAttenuation.glb",
   "https://raw.githubusercontent.com/KhronosGroup/glTF-Sample-Models/master/2.0/Duck/glTF-Binary/Duck.glb",
   "https://raw.githubusercontent.com/KhronosGroup/glTF-Sample-Models/master/2.0/EmissiveStrengthTest/glTF-Binary/EmissiveStrengthTest.glb",
   "https://raw.githubusercontent.com/KhronosGroup/glTF-Sample-Models/master/2.0/Fox/glTF-Binary/Fox.glb",
   "https://raw.githubusercontent.com/KhronosGroup/glTF-Sample-Models/master/2.0/GearboxAssy/glTF-Binary/GearboxAssy.glb",
   "https://raw.githubusercontent.com/KhronosGroup/glTF-Sample-Models/master/2.0/GlamVelvetSofa/glTF-Binary/GlamVelvetSofa.glb",
   "https://raw.githubusercontent.com/KhronosGroup/glTF-Sample-Models/master/2.0/InterpolationTest/glTF-Binary/InterpolationTest.glb",
   "https://raw.githubusercontent.com/KhronosGroup/glTF-Sample-Models/master/2.0/IridescenceLamp/glTF-Binary/IridescenceLamp.glb",
   "https://raw.githubusercontent.com/KhronosGroup/glTF-Sample-Models/master/2.0/IridescenceSuzanne/glTF-Binary/IridescenceSuzanne.glb",
   "https://raw.githubusercontent.com/KhronosGroup/glTF-Sample-Models/master/2.0/IridescentDishWithOlives/glTF-Binary/IridescentDishWithOlives.glb",
   "https://raw.githubusercontent.com/KhronosGroup/glTF-Sample-Models/master/2.0/Lantern/glTF-Binary/Lantern.glb",
   "https://raw.githubusercontent.com/KhronosGroup/glTF-Sample-Models/master/2.0/LightsPunctualLamp/glTF-Binary/LightsPunctualLamp.glb",
   "https://raw.githubusercontent.com/KhronosGroup/glTF-Sample-Models/master/2.0/MaterialsVariantsShoe/glTF-Binary/MaterialsVariantsShoe.glb",
   "https://raw.githubusercontent.com/KhronosGroup/glTF-Sample-Models/master/2.0/MetalRoughSpheres/glTF-Binary/MetalRoughSpheres.glb",
   "https://raw.githubusercontent.com/KhronosGroup/glTF-Sample-Models/master/2.0/MetalRoughSpheresNoTextures/glTF-Binary/MetalRoughSpheresNoTextures.glb",
   "https://raw.githubusercontent.com/KhronosGroup/glTF-Sample-Models/master/2.0/MorphPrimitivesTest/glTF-Binary/MorphPrimitivesTest.glb",
   "https://raw.githubusercontent.com/KhronosGroup/glTF-Sample-Models/master/2.0/MorphStressTest/glTF-Binary/MorphStressTest.glb",
   "https://raw.githubusercontent.com/KhronosGroup/glTF-Sample-Models/master/2.0/MosquitoInAmber/glTF-Binary/MosquitoInAmber.glb",
   "https://raw.githubusercontent.com/KhronosGroup/glTF-Sample-Models/master/2.0/MultiUVTest/glTF-Binary/MultiUVTest.glb",
   "https://raw.githubusercontent.com/KhronosGroup/glTF-Sample-Models/master/2.0/NegativeScaleTest/glTF-Binary/NegativeScaleTest.glb",
   "https://raw.githubusercontent.com/KhronosGroup/glTF-Sample-Models/master/2.0/NormalTangentMirrorTest/glTF-Binary/NormalTangentMirrorTest.glb",
   "https://raw.githubusercontent.com/KhronosGroup/glTF-Sample-Models/master/2.0/NormalTangentTest/glTF-Binary/NormalTangentTest.glb",
   "https://raw.githubusercontent.com/KhronosGroup/glTF-Sample-Models/master/2.0/OrientationTest/glTF-Binary/OrientationTest.glb",
   "https://raw.githubusercontent.com/KhronosGroup/glTF-Sample-Models/master/2.0/ReciprocatingSaw/glTF-Binary/ReciprocatingSaw.glb",
   "https://raw.githubusercontent.com/KhronosGroup/glTF-Sample-Models/master/2.0/RecursiveSkeletons/glTF-Binary/RecursiveSkeletons.glb",
   "https://raw.githubusercontent.com/KhronosGroup/glTF-Sample-Models/master/2.0/RiggedFigure/glTF-Binary/RiggedFigure.glb",
   "https://raw.githubusercontent.com/KhronosGroup/glTF-Sample-Models/master/2.0/RiggedSimple/glTF-Binary/RiggedSimple.glb",
   "https://raw.githubusercontent.com/KhronosGroup/glTF-Sample-Models/master/2.0/SheenChair/glTF-Binary/SheenChair.glb",
   "https://raw.githubusercontent.com/KhronosGroup/glTF-Sample-Models/master/2.0/SimpleInstancing/glTF-Binary/SimpleInstancing.glb",
   "https://raw.githubusercontent.com/KhronosGroup/glTF-Sample-Models/master/2.0/SpecGlossVsMetalRough/glTF-Binary/SpecGlossVsMetalRough.glb",
   "https://raw.githubusercontent.com/KhronosGroup/glTF-Sample-Models/master/2.0/SpecularTest/glTF-Binary/SpecularTest.glb",
   "https://raw.githubusercontent.com/KhronosGroup/glTF-Sample-Models/master/2.0/SuzanneMorphSparse/glTF-Binary/SuzanneMorphSparse.glb",
   "https://raw.githubusercontent.com/KhronosGroup/glTF-Sample-Models/master/2.0/TextureCoordinateTest/glTF-Binary/TextureCoordinateTest.glb",
   "https://raw.githubusercontent.com/KhronosGroup/glTF-Sample-Models/master/2.0/TextureEncodingTest/glTF-Binary/TextureEncodingTest.glb",
   "https://raw.githubusercontent.com/KhronosGroup/glTF-Sample-Models/master/2.0/TextureLinearInterpolationTest/glTF-Binary/TextureLinearInterpolationTest.glb",
   "https://raw.githubusercontent.com/KhronosGroup/glTF-Sample-Models/master/2.0/TextureSettingsTest/glTF-Binary/TextureSettingsTest.glb",
   "https://raw.githubusercontent.com/KhronosGroup/glTF-Sample-Models/master/2.0/TextureTransformMultiTest/glTF-Binary/TextureTransformMultiTest.glb",
   "https://raw.githubusercontent.com/KhronosGroup/glTF-Sample-Models/master/2.0/ToyCar/glTF-Binary/ToyCar.glb",
   "https://raw.githubusercontent.com/KhronosGroup/glTF-Sample-Models/master/2.0/TransmissionRoughnessTest/glTF-Binary/TransmissionRoughnessTest.glb",
   "https://raw.githubusercontent.com/KhronosGroup/glTF-Sample-Models/master/2.0/TransmissionTest/glTF-Binary/TransmissionTest.glb",
   "https://raw.githubusercontent.com/KhronosGroup/glTF-Sample-Models/master/2.0/Unicode❤♻Test/glTF-Binary/Unicode❤♻Test.glb",
   "https://raw.githubusercontent.com/KhronosGroup/glTF-Sample-Models/master/2.0/UnlitTest/glTF-Binary/UnlitTest.glb",
   "https://raw.githubusercontent.com/KhronosGroup/glTF-Sample-Models/master/2.0/VC/glTF-Binary/VC.glb",
   "https://raw.githubusercontent.com/KhronosGroup/glTF-Sample-Models/master/2.0/VertexColorTest/glTF-Binary/VertexColorTest.glb",
   "https://raw.githubusercontent.com/KhronosGroup/glTF-Sample-Models/master/2.0/WaterBottle/glTF-Binary/WaterBottle.glb",
   "https://raw.githubusercontent.com/KhronosGroup/glTF-Sample-Models/master/2.0/XmpMetadataRoundedCube/glTF-Binary/xmp.glb",
   "https://raw.githubusercontent.com/KhronosGroup/glTF-Sample-Assets/master/Models/AlphaBlendModeTest/glTF-Binary/AlphaBlendModeTest.glb",
   "https://raw.githubusercontent.com/KhronosGroup/glTF-Sample-Assets/master/Models/AnimatedMorphCube/glTF-Binary/AnimatedMorphCube.glb",
   "https://raw.githubusercontent.com/KhronosGroup/glTF-Sample-Assets/master/Models/AnisotropyBarnLamp/glTF-Binary/AnisotropyBarnLamp.glb",
   "https://raw.githubusercontent.com/KhronosGroup/glTF-Sample-Assets/master/Models/AnisotropyDiscTest/glTF-Binary/AnisotropyDiscTest.glb",
   "https://raw.githubusercontent.com/KhronosGroup/glTF-Sample-Assets/master/Models/AnisotropyRotationTest/glTF-Binary/AnisotropyRotationTest.glb",
   "https://raw.githubusercontent.com/KhronosGroup/glTF-Sample-Assets/master/Models/AnisotropyStrengthTest/glTF-Binary/AnisotropyStrengthTest.glb",
   "https://raw.githubusercontent.com/KhronosGroup/glTF-Sample-Assets/master/Models/AntiqueCamera/glTF-Binary/AntiqueCamera.glb",
   "https://raw.githubusercontent.com/KhronosGroup/glTF-Sample-Assets/master/Models/AttenuationTest/glTF-Binary/AttenuationTest.glb",
   "https://raw.githubusercontent.com/KhronosGroup/glTF-Sample-Assets/master/Models/Avocado/glTF-Binary/Avocado.glb",
   "https://raw.githubusercontent.com/KhronosGroup/glTF-Sample-Assets/master/Models/BarramundiFish/glTF-Binary/BarramundiFish.glb",
   "https://raw.githubusercontent.com/KhronosGroup/glTF-Sample-Assets/master/Models/BoomBox/glTF-Binary/BoomBox.glb",
   "https://raw.githubusercontent.com/KhronosGroup/glTF-Sample-Assets/master/Models/Box/glTF-Binary/Box.glb",
   "https://raw.githubusercontent.com/KhronosGroup/glTF-Sample-Assets/master/Models/BoxAnimated/glTF-Binary/BoxAnimated.glb",
   "https://raw.githubusercontent.com/KhronosGroup/glTF-Sample-Assets/master/Models/BoxInterleaved/glTF-Binary/BoxInterleaved.glb",
   "https://raw.githubusercontent.com/KhronosGroup/glTF-Sample-Assets/master/Models/BoxTextured/glTF-Binary/BoxTextured.glb",
   "https://raw.githubusercontent.com/KhronosGroup/glTF-Sample-Assets/master/Models/BoxTexturedNonPowerOfTwo/glTF-Binary/BoxTexturedNonPowerOfTwo.glb",
   "https://raw.githubusercontent.com/KhronosGroup/glTF-Sample-Assets/master/Models/BoxVertexColors/glTF-Binary/BoxVertexColors.glb",
   "https://raw.githubusercontent.com/KhronosGroup/glTF-Sample-Assets/master/Models/BrainStem/glTF-Binary/BrainStem.glb",
   "https://raw.githubusercontent.com/KhronosGroup/glTF-Sample-Assets/master/Models/CarbonFibre/glTF-Binary/CarbonFibre.glb",
   "https://raw.githubusercontent.com/KhronosGroup/glTF-Sample-Assets/master/Models/CesiumMan/glTF-Binary/CesiumMan.glb",
   "https://raw.githubusercontent.com/KhronosGroup/glTF-Sample-Assets/master/Models/CesiumMilkTruck/glTF-Binary/CesiumMilkTruck.glb",
   "https://raw.githubusercontent.com/KhronosGroup/glTF-Sample-Assets/master/Models/ChairDamaskPurplegold/glTF-Binary/ChairDamaskPurplegold.glb",
   "https://raw.githubusercontent.com/KhronosGroup/glTF-Sample-Assets/master/Models/ClearCoatCarPaint/glTF-Binary/ClearCoatCarPaint.glb",
   "https://raw.githubusercontent.com/KhronosGroup/glTF-Sample-Assets/master/Models/ClearCoatTest/glTF-Binary/ClearCoatTest.glb",
   "https://raw.githubusercontent.com/KhronosGroup/glTF-Sample-Assets/master/Models/ClearcoatWicker/glTF-Binary/ClearcoatWicker.glb",
   "https://raw.githubusercontent.com/KhronosGroup/glTF-Sample-Assets/master/Models/Corset/glTF-Binary/Corset.glb",
   "https://raw.githubusercontent.com/KhronosGroup/glTF-Sample-Assets/master/Models/DamagedHelmet/glTF-Binary/DamagedHelmet.glb",
   "https://raw.githubusercontent.com/KhronosGroup/glTF-Sample-Assets/master/Models/DiffuseTransmissionPlant/glTF-Binary/DiffuseTransmissionPlant.glb",
   "https://raw.githubusercontent.com/KhronosGroup/glTF-Sample-Assets/master/Models/DiffuseTransmissionTeacup/glTF-Binary/DiffuseTransmissionTeacup.glb",
   "https://raw.githubusercontent.com/KhronosGroup/glTF-Sample-Assets/master/Models/DirectionalLight/glTF-Binary/DirectionalLight.glb",
   "https://raw.githubusercontent.com/KhronosGroup/glTF-Sample-Assets/master/Models/DispersionTest/glTF-Binary/DispersionTest.glb",
   "https://raw.githubusercontent.com/KhronosGroup/glTF-Sample-Assets/master/Models/DragonAttenuation/glTF-Binary/DragonAttenuation.glb",
   "https://raw.githubusercontent.com/KhronosGroup/glTF-Sample-Assets/master/Models/DragonDispersion/glTF-Binary/DragonDispersion.glb",
   "https://raw.githubusercontent.com/KhronosGroup/glTF-Sample-Assets/master/Models/Duck/glTF-Binary/Duck.glb",
   "https://raw.githubusercontent.com/KhronosGroup/glTF-Sample-Assets/master/Models/EmissiveStrengthTest/glTF-Binary/EmissiveStrengthTest.glb",
   "https://raw.githubusercontent.com/KhronosGroup/glTF-Sample-Assets/master/Models/Fox/glTF-Binary/Fox.glb",
   "https://raw.githubusercontent.com/KhronosGroup/glTF-Sample-Assets/master/Models/GlamVelvetSofa/glTF-Binary/GlamVelvetSofa.glb",
   "https://raw.githubusercontent.com/KhronosGroup/glTF-Sample-Assets/master/Models/GlassBrokenWindow/glTF-Binary/GlassBrokenWindow.glb",
   "https://raw.githubusercontent.com/KhronosGroup/glTF-Sample-Assets/master/Models/GlassHurricaneCandleHolder/glTF-Binary/GlassHurricaneCandleHolder.glb",
   "https://raw.githubusercontent.com/KhronosGroup/glTF-Sample-Assets/master/Models/GlassVaseFlowers/glTF-Binary/GlassVaseFlowers.glb",
   "https://raw.githubusercontent.com/KhronosGroup/glTF-Sample-Assets/master/Models/IORTestGrid/glTF-Binary/IORTestGrid.glb",
   "https://raw.githubusercontent.com/KhronosGroup/glTF-Sample-Assets/master/Models/InterpolationTest/glTF-Binary/InterpolationTest.glb",
   "https://raw.githubusercontent.com/KhronosGroup/glTF-Sample-Assets/master/Models/IridescenceAbalone/glTF-Binary/IridescenceAbalone.glb",
   "https://raw.githubusercontent.com/KhronosGroup/glTF-Sample-Assets/master/Models/IridescenceLamp/glTF-Binary/IridescenceLamp.glb",
   "https://raw.githubusercontent.com/KhronosGroup/glTF-Sample-Assets/master/Models/IridescenceSuzanne/glTF-Binary/IridescenceSuzanne.glb",
   "https://raw.githubusercontent.com/KhronosGroup/glTF-Sample-Assets/master/Models/IridescentDishWithOlives/glTF-Binary/IridescentDishWithOlives.glb",
   "https://raw.githubusercontent.com/KhronosGroup/glTF-Sample-Assets/master/Models/Lantern/glTF-Binary/Lantern.glb",
   "https://raw.githubusercontent.com/KhronosGroup/glTF-Sample-Assets/master/Models/LightsPunctualLamp/glTF-Binary/LightsPunctualLamp.glb",
   "https://raw.githubusercontent.com/KhronosGroup/glTF-Sample-Assets/master/Models/MaterialsVariantsShoe/glTF-Binary/MaterialsVariantsShoe.glb",
   "https://raw.githubusercontent.com/KhronosGroup/glTF-Sample-Assets/master/Models/MetalRoughSpheres/glTF-Binary/MetalRoughSpheres.glb",
   "https://raw.githubusercontent.com/KhronosGroup/glTF-Sample-Assets/master/Models/MetalRoughSpheresNoTextures/glTF-Binary/MetalRoughSpheresNoTextures.glb",
   "https://raw.githubusercontent.com/KhronosGroup/glTF-Sample-Assets/master/Models/MorphPrimitivesTest/glTF-Binary/MorphPrimitivesTest.glb",
   "https://raw.githubusercontent.com/KhronosGroup/glTF-Sample-Assets/master/Models/MorphStressTest/glTF-Binary/MorphStressTest.glb",
   "https://raw.githubusercontent.com/KhronosGroup/glTF-Sample-Assets/master/Models/MosquitoInAmber/glTF-Binary/MosquitoInAmber.glb",
   "https://raw.githubusercontent.com/KhronosGroup/glTF-Sample-Assets/master/Models/MultiUVTest/glTF-Binary/MultiUVTest.glb",
   "https://raw.githubusercontent.com/KhronosGroup/glTF-Sample-Assets/master/Models/NegativeScaleTest/glTF-Binary/NegativeScaleTest.glb",
   "https://raw.githubusercontent.com/KhronosGroup/glTF-Sample-Assets/master/Models/NormalTangentMirrorTest/glTF-Binary/NormalTangentMirrorTest.glb",
   "https://raw.githubusercontent.com/KhronosGroup/glTF-Sample-Assets/master/Models/NormalTangentTest/glTF-Binary/NormalTangentTest.glb",
   "https://raw.githubusercontent.com/KhronosGroup/glTF-Sample-Assets/master/Models/OrientationTest/glTF-Binary/OrientationTest.glb",
   "https://raw.githubusercontent.com/KhronosGroup/glTF-Sample-Assets/master/Models/PlaysetLightTest/glTF-Binary/PlaysetLightTest.glb",
   "https://raw.githubusercontent.com/KhronosGroup/glTF-Sample-Assets/master/Models/PotOfCoals/glTF-Binary/PotOfCoals.glb",
   "https://raw.githubusercontent.com/KhronosGroup/glTF-Sample-Assets/master/Models/RecursiveSkeletons/glTF-Binary/RecursiveSkeletons.glb",
   "https://raw.githubusercontent.com/KhronosGroup/glTF-Sample-Assets/master/Models/RiggedFigure/glTF-Binary/RiggedFigure.glb",
   "https://raw.githubusercontent.com/KhronosGroup/glTF-Sample-Assets/master/Models/RiggedSimple/glTF-Binary/RiggedSimple.glb",
   "https://raw.githubusercontent.com/KhronosGroup/glTF-Sample-Assets/master/Models/SheenChair/glTF-Binary/SheenChair.glb",
   "https://raw.githubusercontent.com/KhronosGroup/glTF-Sample-Assets/master/Models/SheenTestGrid/glTF-Binary/SheenTestGrid.glb",
   "https://raw.githubusercontent.com/KhronosGroup/glTF-Sample-Assets/master/Models/SimpleInstancing/glTF-Binary/SimpleInstancing.glb",
   "https://raw.githubusercontent.com/KhronosGroup/glTF-Sample-Assets/master/Models/SpecGlossVsMetalRough/glTF-Binary/SpecGlossVsMetalRough.glb",
   "https://raw.githubusercontent.com/KhronosGroup/glTF-Sample-Assets/master/Models/SpecularSilkPouf/glTF-Binary/SpecularSilkPouf.glb",
   "https://raw.githubusercontent.com/KhronosGroup/glTF-Sample-Assets/master/Models/SpecularTest/glTF-Binary/SpecularTest.glb",
   "https://raw.githubusercontent.com/KhronosGroup/glTF-Sample-Assets/master/Models/TextureCoordinateTest/glTF-Binary/TextureCoordinateTest.glb",
   "https://raw.githubusercontent.com/KhronosGroup/glTF-Sample-Assets/master/Models/TextureEncodingTest/glTF-Binary/TextureEncodingTest.glb",
   "https://raw.githubusercontent.com/KhronosGroup/glTF-Sample-Assets/master/Models/TextureLinearInterpolationTest/glTF-Binary/TextureLinearInterpolationTest.glb",
   "https://raw.githubusercontent.com/KhronosGroup/glTF-Sample-Assets/master/Models/TextureSettingsTest/glTF-Binary/TextureSettingsTest.glb",
   "https://raw.githubusercontent.com/KhronosGroup/glTF-Sample-Assets/master/Models/TextureTransformMultiTest/glTF-Binary/TextureTransformMultiTest.glb",
   "https://raw.githubusercontent.com/KhronosGroup/glTF-Sample-Assets/master/Models/ToyCar/glTF-Binary/ToyCar.glb",
   "https://raw.githubusercontent.com/KhronosGroup/glTF-Sample-Assets/master/Models/TransmissionRoughnessTest/glTF-Binary/TransmissionRoughnessTest.glb",
   "https://raw.githubusercontent.com/KhronosGroup/glTF-Sample-Assets/master/Models/TransmissionTest/glTF-Binary/TransmissionTest.glb",
   "https://raw.githubusercontent.com/KhronosGroup/glTF-Sample-Assets/master/Models/TransmissionThinwallTestGrid/glTF-Binary/TransmissionThinwallTestGrid.glb",
   "https://raw.githubusercontent.com/KhronosGroup/glTF-Sample-Assets/master/Models/Unicode❤♻Test/glTF-Binary/Unicode❤♻Test.glb",
   "https://raw.githubusercontent.com/KhronosGroup/glTF-Sample-Assets/master/Models/UnlitTest/glTF-Binary/UnlitTest.glb",
   "https://raw.githubusercontent.com/KhronosGroup/glTF-Sample-Assets/master/Models/VertexColorTest/glTF-Binary/VertexColorTest.glb",
   "https://raw.githubusercontent.com/KhronosGroup/glTF-Sample-Assets/master/Models/VirtualCity/glTF-Binary/VirtualCity.glb",
   "https://raw.githubusercontent.com/KhronosGroup/glTF-Sample-Assets/master/Models/WaterBottle/glTF-Binary/WaterBottle.glb",
   "https://raw.githubusercontent.com/KhronosGroup/glTF-Sample-Assets/master/Models/XmpMetadataRoundedCube/glTF-Binary/XmpMetadataRoundedCube.glb",
];

const draco = [
   "https://raw.githubusercontent.com/KhronosGroup/glTF-Sample-Models/master/2.0/2CylinderEngine/glTF-Draco/2CylinderEngine.gltf",
   "https://raw.githubusercontent.com/KhronosGroup/glTF-Sample-Models/master/2.0/Avocado/glTF-Draco/Avocado.gltf",
   "https://raw.githubusercontent.com/KhronosGroup/glTF-Sample-Models/master/2.0/BarramundiFish/glTF-Draco/BarramundiFish.gltf",
   "https://raw.githubusercontent.com/KhronosGroup/glTF-Sample-Models/master/2.0/BoomBox/glTF-Draco/BoomBox.gltf",
   "https://raw.githubusercontent.com/KhronosGroup/glTF-Sample-Models/master/2.0/Box/glTF-Draco/Box.gltf",
   "https://raw.githubusercontent.com/KhronosGroup/glTF-Sample-Models/master/2.0/BrainStem/glTF-Draco/BrainStem.gltf",
   "https://raw.githubusercontent.com/KhronosGroup/glTF-Sample-Models/master/2.0/Buggy/glTF-Draco/Buggy.gltf",
   "https://raw.githubusercontent.com/KhronosGroup/glTF-Sample-Models/master/2.0/CesiumMan/glTF-Draco/CesiumMan.gltf",
   "https://raw.githubusercontent.com/KhronosGroup/glTF-Sample-Models/master/2.0/CesiumMilkTruck/glTF-Draco/CesiumMilkTruck.gltf",
   "https://raw.githubusercontent.com/KhronosGroup/glTF-Sample-Models/master/2.0/Corset/glTF-Draco/Corset.gltf",
   "https://raw.githubusercontent.com/KhronosGroup/glTF-Sample-Models/master/2.0/Duck/glTF-Draco/Duck.gltf",
   "https://raw.githubusercontent.com/KhronosGroup/glTF-Sample-Models/master/2.0/GearboxAssy/glTF-Draco/GearboxAssy.gltf",
   "https://raw.githubusercontent.com/KhronosGroup/glTF-Sample-Models/master/2.0/Lantern/glTF-Draco/Lantern.gltf",
   "https://raw.githubusercontent.com/KhronosGroup/glTF-Sample-Models/master/2.0/MorphPrimitivesTest/glTF-Draco/MorphPrimitivesTest.gltf",
   "https://raw.githubusercontent.com/KhronosGroup/glTF-Sample-Models/master/2.0/ReciprocatingSaw/glTF-Draco/ReciprocatingSaw.gltf",
   "https://raw.githubusercontent.com/KhronosGroup/glTF-Sample-Models/master/2.0/RiggedFigure/glTF-Draco/RiggedFigure.gltf",
   "https://raw.githubusercontent.com/KhronosGroup/glTF-Sample-Models/master/2.0/RiggedSimple/glTF-Draco/RiggedSimple.gltf",
   "https://raw.githubusercontent.com/KhronosGroup/glTF-Sample-Models/master/2.0/VC/glTF-Draco/VC.gltf",
   "https://raw.githubusercontent.com/KhronosGroup/glTF-Sample-Models/master/2.0/WaterBottle/glTF-Draco/WaterBottle.gltf",
   "https://raw.githubusercontent.com/KhronosGroup/glTF-Sample-Assets/master/Models/Avocado/glTF-Draco/Avocado.gltf",
   "https://raw.githubusercontent.com/KhronosGroup/glTF-Sample-Assets/master/Models/BarramundiFish/glTF-Draco/BarramundiFish.gltf",
   "https://raw.githubusercontent.com/KhronosGroup/glTF-Sample-Assets/master/Models/BoomBox/glTF-Draco/BoomBox.gltf",
   "https://raw.githubusercontent.com/KhronosGroup/glTF-Sample-Assets/master/Models/Box/glTF-Draco/Box.gltf",
   "https://raw.githubusercontent.com/KhronosGroup/glTF-Sample-Assets/master/Models/BrainStem/glTF-Draco/BrainStem.gltf",
   "https://raw.githubusercontent.com/KhronosGroup/glTF-Sample-Assets/master/Models/CesiumMan/glTF-Draco/CesiumMan.gltf",
   "https://raw.githubusercontent.com/KhronosGroup/glTF-Sample-Assets/master/Models/CesiumMilkTruck/glTF-Draco/CesiumMilkTruck.gltf",
   "https://raw.githubusercontent.com/KhronosGroup/glTF-Sample-Assets/master/Models/Corset/glTF-Draco/Corset.gltf",
   "https://raw.githubusercontent.com/KhronosGroup/glTF-Sample-Assets/master/Models/Duck/glTF-Draco/Duck.gltf",
   "https://raw.githubusercontent.com/KhronosGroup/glTF-Sample-Assets/master/Models/Lantern/glTF-Draco/Lantern.gltf",
   "https://raw.githubusercontent.com/KhronosGroup/glTF-Sample-Assets/master/Models/MorphPrimitivesTest/glTF-Draco/MorphPrimitivesTest.gltf",
   "https://raw.githubusercontent.com/KhronosGroup/glTF-Sample-Assets/master/Models/RiggedFigure/glTF-Draco/RiggedFigure.gltf",
   "https://raw.githubusercontent.com/KhronosGroup/glTF-Sample-Assets/master/Models/RiggedSimple/glTF-Draco/RiggedSimple.gltf",
   "https://raw.githubusercontent.com/KhronosGroup/glTF-Sample-Assets/master/Models/VirtualCity/glTF-Draco/VirtualCity.gltf",
   "https://raw.githubusercontent.com/KhronosGroup/glTF-Sample-Assets/master/Models/WaterBottle/glTF-Draco/WaterBottle.gltf",
];

const embedded = [
   "https://raw.githubusercontent.com/KhronosGroup/glTF-Sample-Models/master/2.0/2CylinderEngine/glTF-Embedded/2CylinderEngine.gltf",
   "https://raw.githubusercontent.com/KhronosGroup/glTF-Sample-Models/master/2.0/AlphaBlendModeTest/glTF-Embedded/AlphaBlendModeTest.gltf",
   "https://raw.githubusercontent.com/KhronosGroup/glTF-Sample-Models/master/2.0/AnimatedTriangle/glTF-Embedded/AnimatedTriangle.gltf",
   "https://raw.githubusercontent.com/KhronosGroup/glTF-Sample-Models/master/2.0/Box/glTF-Embedded/Box.gltf",
   "https://raw.githubusercontent.com/KhronosGroup/glTF-Sample-Models/master/2.0/BoxAnimated/glTF-Embedded/BoxAnimated.gltf",
   "https://raw.githubusercontent.com/KhronosGroup/glTF-Sample-Models/master/2.0/BoxInterleaved/glTF-Embedded/BoxInterleaved.gltf",
   "https://raw.githubusercontent.com/KhronosGroup/glTF-Sample-Models/master/2.0/BoxTextured/glTF-Embedded/BoxTextured.gltf",
   "https://raw.githubusercontent.com/KhronosGroup/glTF-Sample-Models/master/2.0/BoxTexturedNonPowerOfTwo/glTF-Embedded/BoxTexturedNonPowerOfTwo.gltf",
   "https://raw.githubusercontent.com/KhronosGroup/glTF-Sample-Models/master/2.0/BoxVertexColors/glTF-Embedded/BoxVertexColors.gltf",
   "https://raw.githubusercontent.com/KhronosGroup/glTF-Sample-Models/master/2.0/BrainStem/glTF-Embedded/BrainStem.gltf",
   "https://raw.githubusercontent.com/KhronosGroup/glTF-Sample-Models/master/2.0/Buggy/glTF-Embedded/Buggy.gltf",
   "https://raw.githubusercontent.com/KhronosGroup/glTF-Sample-Models/master/2.0/Cameras/glTF-Embedded/Cameras.gltf",
   "https://raw.githubusercontent.com/KhronosGroup/glTF-Sample-Models/master/2.0/CesiumMan/glTF-Embedded/CesiumMan.gltf",
   "https://raw.githubusercontent.com/KhronosGroup/glTF-Sample-Models/master/2.0/CesiumMilkTruck/glTF-Embedded/CesiumMilkTruck.gltf",
   "https://raw.githubusercontent.com/KhronosGroup/glTF-Sample-Models/master/2.0/DamagedHelmet/glTF-Embedded/DamagedHelmet.gltf",
   "https://raw.githubusercontent.com/KhronosGroup/glTF-Sample-Models/master/2.0/Duck/glTF-Embedded/Duck.gltf",
   "https://raw.githubusercontent.com/KhronosGroup/glTF-Sample-Models/master/2.0/GearboxAssy/glTF-Embedded/GearboxAssy.gltf",
   "https://raw.githubusercontent.com/KhronosGroup/glTF-Sample-Models/master/2.0/MeshPrimitiveModes/glTF-Embedded/MeshPrimitiveModes.gltf",
   "https://raw.githubusercontent.com/KhronosGroup/glTF-Sample-Models/master/2.0/MetalRoughSpheres/glTF-Embedded/MetalRoughSpheres.gltf",
   "https://raw.githubusercontent.com/KhronosGroup/glTF-Sample-Models/master/2.0/MultiUVTest/glTF-Embedded/MultiUVTest.gltf",
   "https://raw.githubusercontent.com/KhronosGroup/glTF-Sample-Models/master/2.0/MultipleScenes/glTF-Embedded/MultipleScenes.gltf",
   "https://raw.githubusercontent.com/KhronosGroup/glTF-Sample-Models/master/2.0/NormalTangentMirrorTest/glTF-Embedded/NormalTangentMirrorTest.gltf",
   "https://raw.githubusercontent.com/KhronosGroup/glTF-Sample-Models/master/2.0/NormalTangentTest/glTF-Embedded/NormalTangentTest.gltf",
   "https://raw.githubusercontent.com/KhronosGroup/glTF-Sample-Models/master/2.0/OrientationTest/glTF-Embedded/OrientationTest.gltf",
   "https://raw.githubusercontent.com/KhronosGroup/glTF-Sample-Models/master/2.0/ReciprocatingSaw/glTF-Embedded/ReciprocatingSaw.gltf",
   "https://raw.githubusercontent.com/KhronosGroup/glTF-Sample-Models/master/2.0/RiggedFigure/glTF-Embedded/RiggedFigure.gltf",
   "https://raw.githubusercontent.com/KhronosGroup/glTF-Sample-Models/master/2.0/RiggedSimple/glTF-Embedded/RiggedSimple.gltf",
   "https://raw.githubusercontent.com/KhronosGroup/glTF-Sample-Models/master/2.0/SimpleMeshes/glTF-Embedded/SimpleMeshes.gltf",
   "https://raw.githubusercontent.com/KhronosGroup/glTF-Sample-Models/master/2.0/SimpleMorph/glTF-Embedded/SimpleMorph.gltf",
   "https://raw.githubusercontent.com/KhronosGroup/glTF-Sample-Models/master/2.0/SimpleSkin/glTF-Embedded/SimpleSkin.gltf",
   "https://raw.githubusercontent.com/KhronosGroup/glTF-Sample-Models/master/2.0/SimpleSparseAccessor/glTF-Embedded/SimpleSparseAccessor.gltf",
   "https://raw.githubusercontent.com/KhronosGroup/glTF-Sample-Models/master/2.0/TextureCoordinateTest/glTF-Embedded/TextureCoordinateTest.gltf",
   "https://raw.githubusercontent.com/KhronosGroup/glTF-Sample-Models/master/2.0/TextureSettingsTest/glTF-Embedded/TextureSettingsTest.gltf",
   "https://raw.githubusercontent.com/KhronosGroup/glTF-Sample-Models/master/2.0/Triangle/glTF-Embedded/Triangle.gltf",
   "https://raw.githubusercontent.com/KhronosGroup/glTF-Sample-Models/master/2.0/TriangleWithoutIndices/glTF-Embedded/TriangleWithoutIndices.gltf",
   "https://raw.githubusercontent.com/KhronosGroup/glTF-Sample-Models/master/2.0/VC/glTF-Embedded/VC.gltf",
   "https://raw.githubusercontent.com/KhronosGroup/glTF-Sample-Models/master/2.0/VertexColorTest/glTF-Embedded/VertexColorTest.gltf",
   "https://raw.githubusercontent.com/KhronosGroup/glTF-Sample-Assets/master/Models/AlphaBlendModeTest/glTF-Embedded/AlphaBlendModeTest.gltf",
   "https://raw.githubusercontent.com/KhronosGroup/glTF-Sample-Assets/master/Models/AnimatedTriangle/glTF-Embedded/AnimatedTriangle.gltf",
   "https://raw.githubusercontent.com/KhronosGroup/glTF-Sample-Assets/master/Models/Box/glTF-Embedded/Box.gltf",
   "https://raw.githubusercontent.com/KhronosGroup/glTF-Sample-Assets/master/Models/BoxAnimated/glTF-Embedded/BoxAnimated.gltf",
   "https://raw.githubusercontent.com/KhronosGroup/glTF-Sample-Assets/master/Models/BoxInterleaved/glTF-Embedded/BoxInterleaved.gltf",
   "https://raw.githubusercontent.com/KhronosGroup/glTF-Sample-Assets/master/Models/BoxTextured/glTF-Embedded/BoxTextured.gltf",
   "https://raw.githubusercontent.com/KhronosGroup/glTF-Sample-Assets/master/Models/BoxTexturedNonPowerOfTwo/glTF-Embedded/BoxTexturedNonPowerOfTwo.gltf",
   "https://raw.githubusercontent.com/KhronosGroup/glTF-Sample-Assets/master/Models/BoxVertexColors/glTF-Embedded/BoxVertexColors.gltf",
   "https://raw.githubusercontent.com/KhronosGroup/glTF-Sample-Assets/master/Models/BrainStem/glTF-Embedded/BrainStem.gltf",
   "https://raw.githubusercontent.com/KhronosGroup/glTF-Sample-Assets/master/Models/Cameras/glTF-Embedded/Cameras.gltf",
   "https://raw.githubusercontent.com/KhronosGroup/glTF-Sample-Assets/master/Models/CesiumMan/glTF-Embedded/CesiumMan.gltf",
   "https://raw.githubusercontent.com/KhronosGroup/glTF-Sample-Assets/master/Models/CesiumMilkTruck/glTF-Embedded/CesiumMilkTruck.gltf",
   "https://raw.githubusercontent.com/KhronosGroup/glTF-Sample-Assets/master/Models/DamagedHelmet/glTF-Embedded/DamagedHelmet.gltf",
   "https://raw.githubusercontent.com/KhronosGroup/glTF-Sample-Assets/master/Models/Duck/glTF-Embedded/Duck.gltf",
   "https://raw.githubusercontent.com/KhronosGroup/glTF-Sample-Assets/master/Models/MeshPrimitiveModes/glTF-Embedded/MeshPrimitiveModes.gltf",
   "https://raw.githubusercontent.com/KhronosGroup/glTF-Sample-Assets/master/Models/MetalRoughSpheres/glTF-Embedded/MetalRoughSpheres.gltf",
   "https://raw.githubusercontent.com/KhronosGroup/glTF-Sample-Assets/master/Models/MultiUVTest/glTF-Embedded/MultiUVTest.gltf",
   "https://raw.githubusercontent.com/KhronosGroup/glTF-Sample-Assets/master/Models/MultipleScenes/glTF-Embedded/MultipleScenes.gltf",
   "https://raw.githubusercontent.com/KhronosGroup/glTF-Sample-Assets/master/Models/OrientationTest/glTF-Embedded/OrientationTest.gltf",
   "https://raw.githubusercontent.com/KhronosGroup/glTF-Sample-Assets/master/Models/RiggedFigure/glTF-Embedded/RiggedFigure.gltf",
   "https://raw.githubusercontent.com/KhronosGroup/glTF-Sample-Assets/master/Models/RiggedSimple/glTF-Embedded/RiggedSimple.gltf",
   "https://raw.githubusercontent.com/KhronosGroup/glTF-Sample-Assets/master/Models/SimpleMaterial/glTF-Embedded/SimpleMaterial.gltf",
   "https://raw.githubusercontent.com/KhronosGroup/glTF-Sample-Assets/master/Models/SimpleMeshes/glTF-Embedded/SimpleMeshes.gltf",
   "https://raw.githubusercontent.com/KhronosGroup/glTF-Sample-Assets/master/Models/SimpleMorph/glTF-Embedded/SimpleMorph.gltf",
   "https://raw.githubusercontent.com/KhronosGroup/glTF-Sample-Assets/master/Models/SimpleSkin/glTF-Embedded/SimpleSkin.gltf",
   "https://raw.githubusercontent.com/KhronosGroup/glTF-Sample-Assets/master/Models/SimpleSparseAccessor/glTF-Embedded/SimpleSparseAccessor.gltf",
   "https://raw.githubusercontent.com/KhronosGroup/glTF-Sample-Assets/master/Models/SimpleTexture/glTF-Embedded/SimpleTexture.gltf",
   "https://raw.githubusercontent.com/KhronosGroup/glTF-Sample-Assets/master/Models/TextureCoordinateTest/glTF-Embedded/TextureCoordinateTest.gltf",
   "https://raw.githubusercontent.com/KhronosGroup/glTF-Sample-Assets/master/Models/TextureSettingsTest/glTF-Embedded/TextureSettingsTest.gltf",
   "https://raw.githubusercontent.com/KhronosGroup/glTF-Sample-Assets/master/Models/Triangle/glTF-Embedded/Triangle.gltf",
   "https://raw.githubusercontent.com/KhronosGroup/glTF-Sample-Assets/master/Models/TriangleWithoutIndices/glTF-Embedded/TriangleWithoutIndices.gltf",
   "https://raw.githubusercontent.com/KhronosGroup/glTF-Sample-Assets/master/Models/VertexColorTest/glTF-Embedded/VertexColorTest.gltf",
   "https://raw.githubusercontent.com/KhronosGroup/glTF-Sample-Assets/master/Models/VirtualCity/glTF-Embedded/VirtualCity.gltf",
];

const ibl = [
   "https://raw.githubusercontent.com/KhronosGroup/glTF-Sample-Models/master/2.0/EnvironmentTest/glTF-IBL/EnvironmentTest.gltf",
   "https://raw.githubusercontent.com/KhronosGroup/glTF-Sample-Assets/master/Models/EnvironmentTest/glTF-IBL/EnvironmentTest.gltf",
];

const ktx = [
   "https://raw.githubusercontent.com/KhronosGroup/glTF-Sample-Models/master/2.0/FlightHelmet/glTF-KTX-BasisU/FlightHelmet.gltf",
   "https://raw.githubusercontent.com/KhronosGroup/glTF-Sample-Models/master/2.0/StainedGlassLamp/glTF-KTX-BasisU/StainedGlassLamp.gltf",
   "https://raw.githubusercontent.com/KhronosGroup/glTF-Sample-Assets/master/Models/AnisotropyBarnLamp/glTF-KTX-BasisU/AnisotropyBarnLamp.gltf",
   "https://raw.githubusercontent.com/KhronosGroup/glTF-Sample-Assets/master/Models/StainedGlassLamp/glTF-KTX-BasisU/StainedGlassLamp.gltf",
];

// TESTS_END

function createList (description, filenames)
{
   const column = $(".viewer-column2");

   $("<div></div>") .append ($("<strong></strong>") .text (description)) .appendTo (column);

   const
      list = $("<ul></ul>") .appendTo (column),
      map  = new Map ();

   for (const filename of filenames)
   {
      const
         match = filename .match (/([^\/]+)\.\w+$/),
         name  = match [1] .replace (/([A-Z]+)/g, " $1") .replace (/\s+/g, " ") .trim ();

      if (map .has (name))
         continue;

      map .set (name, filename);
   }

   for (const [name, filename] of [... map] .sort ((a, b) => a [0] .localeCompare (b [0])))
   {
      $("<a></a>")
         .text (name)
         .attr ("href", filename)
         .appendTo ($("<li></li>") .appendTo (list))
         .on ("click", loadURL .bind (null, filename));
   }
}

async function loadURL (filename, event)
{
   event .preventDefault ();

   $("#animations") .hide ();

   const Browser = X3D .getBrowser ();

   await Browser .loadURL (new X3D .MFString (filename));

   if (ibl_files .some (name => filename .includes (name)))
      Browser .currentScene .rootNodes .push (await getEnvironmentLight (Browser, Browser .currentScene));

   if (!Browser .getActiveViewpoint () ._description .getValue ())
      Browser .viewAll (0);

   try
   {
      const animations = Browser .currentScene .getExportedNode ("Animations");

      $("#animations") .empty ();
      $("<b></b>") .text ("Animations") .appendTo ($("#animations"));
      $("<br>") .appendTo ($("#animations"));

      for (const [i, group] of animations .children .entries ())
      {
         const timeSensor = group .children [0];

         $("<input></input>")
            .attr ("id", "animation" + i)
            .attr ("type", "checkbox")
            .on ("change", event =>
            {
               for (const group of animations .children)
                  group .children [0] .stopTime = Date .now () / 1000;

               if (!event .target .checked)
                  return;

               $("#animations") .children () .each ((i, element) =>
               {
                  if (element !== event .target)
                     element .checked = false;
               });

               timeSensor .loop      = true;
               timeSensor .startTime = Date .now () / 1000;
            })
            .appendTo ($("#animations"));

         $(document .createTextNode (" ")) .appendTo ($("#animations"));

         $("<label></label>")
            .attr ("for", "animation" + i)
            .text (group .children [0] .description)
            .appendTo ($("#animations"));

         $("<br>") .appendTo ($("#animations"));
      }

      $("#animations") .show () .find ("input") .first () .trigger ("click");
   }
   catch
   { }
}

async function getEnvironmentLight (Browser, scene)
{
   if (getEnvironmentLight .environmentLight)
      return getEnvironmentLight .environmentLight;

   const cubeMapTexturing = Browser .getComponent ("CubeMapTexturing");

   await Browser .loadComponents (cubeMapTexturing);
   scene .addComponent (cubeMapTexturing);

   const
      environmentLight  = scene .createNode ("EnvironmentLight"),
      diffuseTexture    = scene .createNode ("ImageCubeMapTexture"),
      specularTexture   = scene .createNode ("ImageCubeMapTexture"),
      textureProperties = scene .createNode ("TextureProperties");

   textureProperties .generateMipMaps     = true;
   textureProperties .minificationFilter  = "NICEST";
   textureProperties .magnificationFilter = "NICEST";

   diffuseTexture  .url               = new X3D .MFString (new URL ("/x_ite/assets/img/glTF/helipad-diffuse.jpg",  location));
   diffuseTexture  .textureProperties = textureProperties;
   specularTexture .url               = new X3D .MFString (new URL ("/x_ite/assets/img/glTF/helipad-specular.jpg", location));
   specularTexture .textureProperties = textureProperties;

   environmentLight .color           = new X3D .SFColor (0.9764706, 0.7960784, 0.6117647);
   environmentLight .rotation        = new X3D .SFRotation (0, 1, 0, Math .PI / 2);
   environmentLight .diffuseTexture  = diffuseTexture;
   environmentLight .specularTexture = specularTexture;

   return getEnvironmentLight .environmentLight = environmentLight;
}

createList ("glTF Random Models",          models);
createList ("glTF Sample Models",          glTF);
createList ("glb Sample Models",           glb);
createList ("glTF Draco Sample Models",    draco);
createList ("glTF Embedded Sample Models", embedded);
createList ("glTF IBL Sample Models",      ibl);
createList ("glTF KTX Sample Models",      ktx);
