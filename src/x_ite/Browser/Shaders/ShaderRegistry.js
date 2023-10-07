/*******************************************************************************
 *
 * DO NOT ALTER OR REMOVE COPYRIGHT NOTICES OR THIS FILE HEADER.
 *
 * Copyright create3000, Scheffelstraße 31a, Leipzig, Germany 2011 - 2022.
 *
 * All rights reserved. Holger Seelig <holger.seelig@yahoo.de>.
 *
 * The copyright notice above does not evidence any actual of intended
 * publication of such source code, and is an unpublished work by create3000.
 * This material contains CONFIDENTIAL INFORMATION that is the property of
 * create3000.
 *
 * No permission is granted to copy, distribute, or create derivative works from
 * the contents of this software, in whole or in part, without the prior written
 * permission of create3000.
 *
 * NON-MILITARY USE ONLY
 *
 * All create3000 software are effectively free software with a non-military use
 * restriction. It is free. Well commented source is provided. You may reuse the
 * source in any way you please with the exception anything that uses it must be
 * marked to indicate is contains 'non-military use only' components.
 *
 * DO NOT ALTER OR REMOVE COPYRIGHT NOTICES OR THIS FILE HEADER.
 *
 * Copyright 2011 - 2022, Holger Seelig <holger.seelig@yahoo.de>.
 *
 * This file is part of the X_ITE Project.
 *
 * X_ITE is free software: you can redistribute it and/or modify it under the
 * terms of the GNU General Public License version 3 only, as published by the
 * Free Software Foundation.
 *
 * X_ITE is distributed in the hope that it will be useful, but WITHOUT ANY
 * WARRANTY; without even the implied warranty of MERCHANTABILITY or FITNESS FOR
 * A PARTICULAR PURPOSE. See the GNU General Public License version 3 for more
 * details (a copy is included in the LICENSE file that accompanied this code).
 *
 * You should have received a copy of the GNU General Public License version 3
 * along with X_ITE.  If not, see <https://www.gnu.org/licenses/gpl.html> for a
 * copy of the GPLv3 License.
 *
 * For Silvio, Joy and Adi.
 *
 ******************************************************************************/

/* WebGL 1 */
import ClipPlanes1            from "../../../assets/shaders/webgl1/common/ClipPlanes1.glsl.js";
import Colors1                from "../../../assets/shaders/webgl1/common/Colors1.glsl.js";
import Fog1                   from "../../../assets/shaders/webgl1/common/Fog1.glsl.js";
import Fragment1              from "../../../assets/shaders/webgl1/common/Fragment1.glsl.js";
import Hatch1                 from "../../../assets/shaders/webgl1/common/Hatch1.glsl.js";
import Lighting1              from "../../../assets/shaders/webgl1/common/Lighting1.glsl.js";
import Material1              from "../../../assets/shaders/webgl1/common/Material1.glsl.js";
import Normal1                from "../../../assets/shaders/webgl1/common/Normal1.glsl.js";
import Perlin1                from "../../../assets/shaders/webgl1/common/Perlin1.glsl.js";
import Point1                 from "../../../assets/shaders/webgl1/common/Point1.glsl.js";
import PointSize1             from "../../../assets/shaders/webgl1/common/PointSize1.glsl.js";
import Shadow1                from "../../../assets/shaders/webgl1/common/Shadow1.glsl.js";
import Texture1               from "../../../assets/shaders/webgl1/common/Texture1.glsl.js";
import Vertex1                from "../../../assets/shaders/webgl1/common/Vertex1.glsl.js";

/* WebGL 2 */
import ClipPlanes2            from "../../../assets/shaders/webgl2/common/ClipPlanes2.glsl.js";
import Fog2                   from "../../../assets/shaders/webgl2/common/Fog2.glsl.js";
import Fragment2              from "../../../assets/shaders/webgl2/common/Fragment2.glsl.js";
import Hatch2                 from "../../../assets/shaders/webgl2/common/Hatch2.glsl.js";
import Lighting2              from "../../../assets/shaders/webgl2/common/Lighting2.glsl.js";
import Line22                 from "../../../assets/shaders/webgl2/common/Line22.glsl.js";
import Material2              from "../../../assets/shaders/webgl2/common/Material2.glsl.js";
import Normal2                from "../../../assets/shaders/webgl2/common/Normal2.glsl.js";
import Particle2              from "../../../assets/shaders/webgl2/common/Particle2.glsl.js";
import Perlin2                from "../../../assets/shaders/webgl2/common/Perlin2.glsl.js";
import Point2                 from "../../../assets/shaders/webgl2/common/Point2.glsl.js";
import PointSize2             from "../../../assets/shaders/webgl2/common/PointSize2.glsl.js";
import Shadow2                from "../../../assets/shaders/webgl2/common/Shadow2.glsl.js";
import Skin2                  from "../../../assets/shaders/webgl2/common/Skin2.glsl.js";
import Stipple2               from "../../../assets/shaders/webgl2/common/Stipple2.glsl.js";
import Texture2               from "../../../assets/shaders/webgl2/common/Texture2.glsl.js";
import Utils2                 from "../../../assets/shaders/webgl2/common/Utils2.glsl.js";
import Vertex2                from "../../../assets/shaders/webgl2/common/Vertex2.glsl.js";

/* WebGL 1 */
import DefaultVertex1         from "../../../assets/shaders/webgl1/Default1.vs.js";
import DepthFragment1         from "../../../assets/shaders/webgl1/Depth1.fs.js";
import DepthVertex1           from "../../../assets/shaders/webgl1/Depth1.vs.js";
import GouraudFragment1       from "../../../assets/shaders/webgl1/Gouraud1.fs.js";
import GouraudVertex1         from "../../../assets/shaders/webgl1/Gouraud1.vs.js";
import PBRFragment1           from "../../../assets/shaders/webgl1/PBR1.fs.js";
import PhongFragment1         from "../../../assets/shaders/webgl1/Phong1.fs.js";
import PointingFragment1      from "../../../assets/shaders/webgl1/Pointing1.fs.js";
import PointingVertex1        from "../../../assets/shaders/webgl1/Pointing1.vs.js";
import UnlitFragment1         from "../../../assets/shaders/webgl1/Unlit1.fs.js";

/* WebGL 2 */
import ComposeFragment2       from "../../../assets/shaders/webgl2/Compose2.fs.js";
import FullScreenVertex2      from "../../../assets/shaders/webgl2/FullScreen2.vs.js";
import DefaultVertex2         from "../../../assets/shaders/webgl2/Default2.vs.js";
import DepthFragment2         from "../../../assets/shaders/webgl2/Depth2.fs.js";
import DepthVertex2           from "../../../assets/shaders/webgl2/Depth2.vs.js";
import GouraudFragment2       from "../../../assets/shaders/webgl2/Gouraud2.fs.js";
import GouraudVertex2         from "../../../assets/shaders/webgl2/Gouraud2.vs.js";
import LineTransformFragment2 from "../../../assets/shaders/webgl2/LineTransform2.fs.js";
import LineTransformVertex2   from "../../../assets/shaders/webgl2/LineTransform2.vs.js";
import PBRFragment2           from "../../../assets/shaders/webgl2/PBR2.fs.js";
import PhongFragment2         from "../../../assets/shaders/webgl2/Phong2.fs.js";
import PointingFragment2      from "../../../assets/shaders/webgl2/Pointing2.fs.js";
import PointingVertex2        from "../../../assets/shaders/webgl2/Pointing2.vs.js";
import UnlitFragment2         from "../../../assets/shaders/webgl2/Unlit2.fs.js";

/* PBR 1 */
import BDRF1                  from "../../../assets/shaders/webgl1/pbr/BDRF1.glsl.js";
import Punctual1              from "../../../assets/shaders/webgl1/pbr/Punctual1.glsl.js";
import MaterialInfo1          from "../../../assets/shaders/webgl1/pbr/MaterialInfo1.glsl.js";
import ToneMapping1           from "../../../assets/shaders/webgl1/pbr/ToneMapping1.glsl.js";

/* PBR 2 */
import BDRF2                  from "../../../assets/shaders/webgl2/pbr/BDRF2.glsl.js";
import IBL2                   from "../../../assets/shaders/webgl2/pbr/IBL2.glsl.js";
import Punctual2              from "../../../assets/shaders/webgl2/pbr/Punctual2.glsl.js";
import MaterialInfo2          from "../../../assets/shaders/webgl2/pbr/MaterialInfo2.glsl.js";
import ToneMapping2           from "../../../assets/shaders/webgl2/pbr/ToneMapping2.glsl.js";

const ShaderRegistry = {
   includes: {
      1: {
         ClipPlanes: ClipPlanes1,
         Colors: Colors1,
         Fog: Fog1,
         Fragment: Fragment1,
         Hatch: Hatch1,
         Lighting: Lighting1,
         Material: Material1,
         Normal: Normal1,
         Perlin: Perlin1,
         Point: Point1,
         PointSize: PointSize1,
         Shadow: Shadow1,
         Texture: Texture1,
         Vertex: Vertex1,
         // PBR
         BDRF: BDRF1,
         MaterialInfo: MaterialInfo1,
         Punctual: Punctual1,
         ToneMapping: ToneMapping1,
      },
      2: {
         ClipPlanes: ClipPlanes2,
         Fog: Fog2,
         Fragment: Fragment2,
         Hatch: Hatch2,
         Lighting: Lighting2,
         Line2: Line22,
         Material: Material2,
         Normal: Normal2,
         Particle: Particle2,
         Perlin: Perlin2,
         Point: Point2,
         PointSize: PointSize2,
         Shadow: Shadow2,
         Skin: Skin2,
         Stipple: Stipple2,
         Texture: Texture2,
         Utils: Utils2,
         Vertex: Vertex2,
         // PBR
         BDRF: BDRF2,
         IBL: IBL2,
         MaterialInfo: MaterialInfo2,
         Punctual: Punctual2,
         ToneMapping: ToneMapping2,
      },
   },
   vertex: {
      1: {
         Default: DefaultVertex1,
         Depth: DepthVertex1,
         Gouraud: GouraudVertex1,
         Pointing: PointingVertex1,
      },
      2: {
         Default: DefaultVertex2,
         Depth: DepthVertex2,
         FullScreen: FullScreenVertex2,
         Gouraud: GouraudVertex2,
         LineTransform: LineTransformVertex2,
         Pointing: PointingVertex2,
      },
   },
   fragment: {
      1: {
         Depth: DepthFragment1,
         Gouraud: GouraudFragment1,
         PBR: PBRFragment1,
         Phong: PhongFragment1,
         Pointing: PointingFragment1,
         Unlit: UnlitFragment1,
      },
      2: {
         Compose: ComposeFragment2,
         Depth: DepthFragment2,
         Gouraud: GouraudFragment2,
         LineTransform: LineTransformFragment2,
         PBR: PBRFragment2,
         Phong: PhongFragment2,
         Pointing: PointingFragment2,
         Unlit: UnlitFragment2,
      },
   },
};

export default ShaderRegistry;
