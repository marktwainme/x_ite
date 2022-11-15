/* X_ITE v7.0.0 */ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	// The require scope
/******/ 	var __webpack_require__ = {};
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/compat get default export */
/******/ 	(() => {
/******/ 		// getDefaultExport function for compatibility with non-harmony modules
/******/ 		__webpack_require__.n = (module) => {
/******/ 			var getter = module && module.__esModule ?
/******/ 				() => (module['default']) :
/******/ 				() => (module);
/******/ 			__webpack_require__.d(getter, { a: getter });
/******/ 			return getter;
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};

// UNUSED EXPORTS: default

;// CONCATENATED MODULE: external "window [Symbol .for (\"X_ITE.X3D\")] .require (\"x_ite/Components\")"
const Components_namespaceObject = window [Symbol .for ("X_ITE.X3D-7.0.0")] .require ("x_ite/Components");
var Components_default = /*#__PURE__*/__webpack_require__.n(Components_namespaceObject);
;// CONCATENATED MODULE: external "window [Symbol .for (\"X_ITE.X3D\")] .require (\"x_ite/Fields\")"
const Fields_namespaceObject = window [Symbol .for ("X_ITE.X3D-7.0.0")] .require ("x_ite/Fields");
var Fields_default = /*#__PURE__*/__webpack_require__.n(Fields_namespaceObject);
;// CONCATENATED MODULE: external "window [Symbol .for (\"X_ITE.X3D\")] .require (\"x_ite/Base/X3DFieldDefinition\")"
const X3DFieldDefinition_namespaceObject = window [Symbol .for ("X_ITE.X3D-7.0.0")] .require ("x_ite/Base/X3DFieldDefinition");
var X3DFieldDefinition_default = /*#__PURE__*/__webpack_require__.n(X3DFieldDefinition_namespaceObject);
;// CONCATENATED MODULE: external "window [Symbol .for (\"X_ITE.X3D\")] .require (\"x_ite/Base/FieldDefinitionArray\")"
const FieldDefinitionArray_namespaceObject = window [Symbol .for ("X_ITE.X3D-7.0.0")] .require ("x_ite/Base/FieldDefinitionArray");
var FieldDefinitionArray_default = /*#__PURE__*/__webpack_require__.n(FieldDefinitionArray_namespaceObject);
;// CONCATENATED MODULE: external "window [Symbol .for (\"X_ITE.X3D\")] .require (\"x_ite/Components/Core/X3DChildNode\")"
const X3DChildNode_namespaceObject = window [Symbol .for ("X_ITE.X3D-7.0.0")] .require ("x_ite/Components/Core/X3DChildNode");
var X3DChildNode_default = /*#__PURE__*/__webpack_require__.n(X3DChildNode_namespaceObject);
;// CONCATENATED MODULE: external "window [Symbol .for (\"X_ITE.X3D\")] .require (\"x_ite/Base/X3DConstants\")"
const X3DConstants_namespaceObject = window [Symbol .for ("X_ITE.X3D-7.0.0")] .require ("x_ite/Base/X3DConstants");
var X3DConstants_default = /*#__PURE__*/__webpack_require__.n(X3DConstants_namespaceObject);
;// CONCATENATED MODULE: ./src/x_ite/Components/EventUtilities/BooleanFilter.js
/* -*- Mode: JavaScript; coding: utf-8; tab-width: 3; indent-tabs-mode: tab; c-basic-offset: 3 -*-
 *******************************************************************************
 *
 * DO NOT ALTER OR REMOVE COPYRIGHT NOTICES OR THIS FILE HEADER.
 *
 * Copyright create3000, Scheffelstraße 31a, Leipzig, Germany 2011.
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
 * Copyright 2015, 2016 Holger Seelig <holger.seelig@yahoo.de>.
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
 * along with X_ITE.  If not, see <http://www.gnu.org/licenses/gpl.html> for a
 * copy of the GPLv3 License.
 *
 * For Silvio, Joy and Adi.
 *
 ******************************************************************************/








function BooleanFilter (executionContext)
{
   X3DChildNode_default().call (this, executionContext);

   this .addType ((X3DConstants_default()).BooleanFilter);
}

BooleanFilter .prototype = Object .assign (Object .create ((X3DChildNode_default()).prototype),
{
   constructor: BooleanFilter,
   [Symbol .for ("X_ITE.X3DBaseNode.fieldDefinitions")]: new (FieldDefinitionArray_default()) ([
      new (X3DFieldDefinition_default()) ((X3DConstants_default()).inputOutput, "metadata",    new (Fields_default()).SFNode ()),
      new (X3DFieldDefinition_default()) ((X3DConstants_default()).inputOnly,   "set_boolean", new (Fields_default()).SFBool ()),
      new (X3DFieldDefinition_default()) ((X3DConstants_default()).outputOnly,  "inputTrue",   new (Fields_default()).SFBool ()),
      new (X3DFieldDefinition_default()) ((X3DConstants_default()).outputOnly,  "inputFalse",  new (Fields_default()).SFBool ()),
      new (X3DFieldDefinition_default()) ((X3DConstants_default()).outputOnly,  "inputNegate", new (Fields_default()).SFBool ()),
   ]),
   getTypeName: function ()
   {
      return "BooleanFilter";
   },
   getComponentName: function ()
   {
      return "EventUtilities";
   },
   getContainerField: function ()
   {
      return "children";
   },
   initialize: function ()
   {
      X3DChildNode_default().prototype.initialize.call (this);

      this ._set_boolean .addInterest ("set_boolean__", this);
   },
   set_boolean__: function ()
   {
      const value = this ._set_boolean .getValue ();

      if (value)
         this ._inputTrue = true;

      else
         this ._inputFalse = false;

      this ._inputNegate = ! value;
   },
});

/* harmony default export */ const EventUtilities_BooleanFilter = (BooleanFilter);

;// CONCATENATED MODULE: external "window [Symbol .for (\"X_ITE.X3D\")] .require (\"standard/Math/Algorithm\")"
const Algorithm_namespaceObject = window [Symbol .for ("X_ITE.X3D-7.0.0")] .require ("standard/Math/Algorithm");
var Algorithm_default = /*#__PURE__*/__webpack_require__.n(Algorithm_namespaceObject);
;// CONCATENATED MODULE: ./src/x_ite/Components/EventUtilities/X3DSequencerNode.js
/* -*- Mode: JavaScript; coding: utf-8; tab-width: 3; indent-tabs-mode: tab; c-basic-offset: 3 -*-
 *******************************************************************************
 *
 * DO NOT ALTER OR REMOVE COPYRIGHT NOTICES OR THIS FILE HEADER.
 *
 * Copyright create3000, Scheffelstraße 31a, Leipzig, Germany 2011.
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
 * Copyright 2015, 2016 Holger Seelig <holger.seelig@yahoo.de>.
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
 * along with X_ITE.  If not, see <http://www.gnu.org/licenses/gpl.html> for a
 * copy of the GPLv3 License.
 *
 * For Silvio, Joy and Adi.
 *
 ******************************************************************************/






function X3DSequencerNode (executionContext)
{
   X3DChildNode_default().call (this, executionContext);

   this .addType ((X3DConstants_default()).X3DSequencerNode);

   this .index = -1;
}

X3DSequencerNode .prototype = Object .assign (Object .create ((X3DChildNode_default()).prototype),
{
   constructor: X3DSequencerNode,
   initialize: function ()
   {
      X3DChildNode_default().prototype.initialize.call (this);

      this ._set_fraction .addInterest ("set_fraction__", this);
      this ._previous     .addInterest ("set_previous__", this);
      this ._next         .addInterest ("set_next__", this);
      this ._key          .addInterest ("set_index__", this);
   },
   set_fraction__: function ()
   {
      const
         fraction = this ._set_fraction .getValue (),
         key      = this ._key,
         length   = key .length;

      if (length === 0)
         return;

      let i = 0;

      if (length === 1 || fraction <= key [0])
         i = 0;

      else if (fraction >= key [length - 1])
         i = this .getSize () - 1;

      else
      {
         const index = Algorithm_default().upperBound (key, 0, length, fraction);

         i = index - 1;
      }

      if (i !== this .index)
      {
         if (i < this .getSize ())
         {
            this .sequence (this .index = i);
         }
      }
   },
   set_previous__: function ()
   {
      if (this ._previous .getValue ())
      {
         if (this .index <= 0)
            this .index = this .getSize () - 1;

         else
            -- this .index;

         if (this .index < this .getSize ())
            this .sequence (this .index);
      }
   },
   set_next__: function ()
   {
      if (this ._next .getValue ())
      {
         if (this .index >= this .getSize () - 1)
            this .index = 0;

         else
            ++ this .index;

         if (this .index < this .getSize ())
            this .sequence (this .index);
      }
   },
   set_index__: function ()
   {
      this .index = -1;
   },
});

/* harmony default export */ const EventUtilities_X3DSequencerNode = (X3DSequencerNode);

;// CONCATENATED MODULE: ./src/x_ite/Components/EventUtilities/BooleanSequencer.js
/* -*- Mode: JavaScript; coding: utf-8; tab-width: 3; indent-tabs-mode: tab; c-basic-offset: 3 -*-
 *******************************************************************************
 *
 * DO NOT ALTER OR REMOVE COPYRIGHT NOTICES OR THIS FILE HEADER.
 *
 * Copyright create3000, Scheffelstraße 31a, Leipzig, Germany 2011.
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
 * Copyright 2015, 2016 Holger Seelig <holger.seelig@yahoo.de>.
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
 * along with X_ITE.  If not, see <http://www.gnu.org/licenses/gpl.html> for a
 * copy of the GPLv3 License.
 *
 * For Silvio, Joy and Adi.
 *
 ******************************************************************************/








function BooleanSequencer (executionContext)
{
   EventUtilities_X3DSequencerNode.call (this, executionContext);

   this .addType ((X3DConstants_default()).BooleanSequencer);
}

BooleanSequencer .prototype = Object .assign (Object .create (EventUtilities_X3DSequencerNode.prototype),
{
   constructor: BooleanSequencer,
   [Symbol .for ("X_ITE.X3DBaseNode.fieldDefinitions")]: new (FieldDefinitionArray_default()) ([
      new (X3DFieldDefinition_default()) ((X3DConstants_default()).inputOutput, "metadata",      new (Fields_default()).SFNode ()),
      new (X3DFieldDefinition_default()) ((X3DConstants_default()).inputOnly,   "set_fraction",  new (Fields_default()).SFFloat ()),
      new (X3DFieldDefinition_default()) ((X3DConstants_default()).inputOnly,   "previous",      new (Fields_default()).SFBool ()),
      new (X3DFieldDefinition_default()) ((X3DConstants_default()).inputOnly,   "next",          new (Fields_default()).SFBool ()),
      new (X3DFieldDefinition_default()) ((X3DConstants_default()).inputOutput, "key",           new (Fields_default()).MFFloat ()),
      new (X3DFieldDefinition_default()) ((X3DConstants_default()).inputOutput, "keyValue",      new (Fields_default()).MFBool ()),
      new (X3DFieldDefinition_default()) ((X3DConstants_default()).outputOnly,  "value_changed", new (Fields_default()).SFBool ()),
   ]),
   getTypeName: function ()
   {
      return "BooleanSequencer";
   },
   getComponentName: function ()
   {
      return "EventUtilities";
   },
   getContainerField: function ()
   {
      return "children";
   },
   initialize: function ()
   {
      EventUtilities_X3DSequencerNode.prototype.initialize.call (this);

      this ._keyValue .addInterest ("set_index__", this);
   },
   getSize: function ()
   {
      return this ._keyValue .length;
   },
   sequence: function (index)
   {
      this ._value_changed = this ._keyValue [index];
   },
});

/* harmony default export */ const EventUtilities_BooleanSequencer = (BooleanSequencer);

;// CONCATENATED MODULE: ./src/x_ite/Components/EventUtilities/BooleanToggle.js
/* -*- Mode: JavaScript; coding: utf-8; tab-width: 3; indent-tabs-mode: tab; c-basic-offset: 3 -*-
 *******************************************************************************
 *
 * DO NOT ALTER OR REMOVE COPYRIGHT NOTICES OR THIS FILE HEADER.
 *
 * Copyright create3000, Scheffelstraße 31a, Leipzig, Germany 2011.
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
 * Copyright 2015, 2016 Holger Seelig <holger.seelig@yahoo.de>.
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
 * along with X_ITE.  If not, see <http://www.gnu.org/licenses/gpl.html> for a
 * copy of the GPLv3 License.
 *
 * For Silvio, Joy and Adi.
 *
 ******************************************************************************/








function BooleanToggle (executionContext)
{
   X3DChildNode_default().call (this, executionContext);

   this .addType ((X3DConstants_default()).BooleanToggle);
}

BooleanToggle .prototype = Object .assign (Object .create ((X3DChildNode_default()).prototype),
{
   constructor: BooleanToggle,
   [Symbol .for ("X_ITE.X3DBaseNode.fieldDefinitions")]: new (FieldDefinitionArray_default()) ([
      new (X3DFieldDefinition_default()) ((X3DConstants_default()).inputOutput, "metadata",    new (Fields_default()).SFNode ()),
      new (X3DFieldDefinition_default()) ((X3DConstants_default()).inputOnly,   "set_boolean", new (Fields_default()).SFBool ()),
      new (X3DFieldDefinition_default()) ((X3DConstants_default()).inputOutput, "toggle",      new (Fields_default()).SFBool ()),
   ]),
   getTypeName: function ()
   {
      return "BooleanToggle";
   },
   getComponentName: function ()
   {
      return "EventUtilities";
   },
   getContainerField: function ()
   {
      return "children";
   },
   initialize: function ()
   {
      X3DChildNode_default().prototype.initialize.call (this);

      this ._set_boolean .addInterest ("set_boolean__", this);
   },
   set_boolean__: function ()
   {
      if (this ._set_boolean .getValue ())
         this ._toggle = ! this ._toggle .getValue ();
   },
});

/* harmony default export */ const EventUtilities_BooleanToggle = (BooleanToggle);

;// CONCATENATED MODULE: ./src/x_ite/Components/EventUtilities/X3DTriggerNode.js
/* -*- Mode: JavaScript; coding: utf-8; tab-width: 3; indent-tabs-mode: tab; c-basic-offset: 3 -*-
 *******************************************************************************
 *
 * DO NOT ALTER OR REMOVE COPYRIGHT NOTICES OR THIS FILE HEADER.
 *
 * Copyright create3000, Scheffelstraße 31a, Leipzig, Germany 2011.
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
 * Copyright 2015, 2016 Holger Seelig <holger.seelig@yahoo.de>.
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
 * along with X_ITE.  If not, see <http://www.gnu.org/licenses/gpl.html> for a
 * copy of the GPLv3 License.
 *
 * For Silvio, Joy and Adi.
 *
 ******************************************************************************/





function X3DTriggerNode (executionContext)
{
   X3DChildNode_default().call (this, executionContext);

   this .addType ((X3DConstants_default()).X3DTriggerNode);
}

X3DTriggerNode .prototype = Object .assign (Object .create ((X3DChildNode_default()).prototype),
{
   constructor: X3DTriggerNode,
});

/* harmony default export */ const EventUtilities_X3DTriggerNode = (X3DTriggerNode);

;// CONCATENATED MODULE: ./src/x_ite/Components/EventUtilities/BooleanTrigger.js
/* -*- Mode: JavaScript; coding: utf-8; tab-width: 3; indent-tabs-mode: tab; c-basic-offset: 3 -*-
 *******************************************************************************
 *
 * DO NOT ALTER OR REMOVE COPYRIGHT NOTICES OR THIS FILE HEADER.
 *
 * Copyright create3000, Scheffelstraße 31a, Leipzig, Germany 2011.
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
 * Copyright 2015, 2016 Holger Seelig <holger.seelig@yahoo.de>.
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
 * along with X_ITE.  If not, see <http://www.gnu.org/licenses/gpl.html> for a
 * copy of the GPLv3 License.
 *
 * For Silvio, Joy and Adi.
 *
 ******************************************************************************/








function BooleanTrigger (executionContext)
{
   EventUtilities_X3DTriggerNode.call (this, executionContext);

   this .addType ((X3DConstants_default()).BooleanTrigger);
}

BooleanTrigger .prototype = Object .assign (Object .create (EventUtilities_X3DTriggerNode.prototype),
{
   constructor: BooleanTrigger,
   [Symbol .for ("X_ITE.X3DBaseNode.fieldDefinitions")]: new (FieldDefinitionArray_default()) ([
      new (X3DFieldDefinition_default()) ((X3DConstants_default()).inputOutput, "metadata",        new (Fields_default()).SFNode ()),
      new (X3DFieldDefinition_default()) ((X3DConstants_default()).inputOnly,   "set_triggerTime", new (Fields_default()).SFTime ()),
      new (X3DFieldDefinition_default()) ((X3DConstants_default()).outputOnly,  "triggerTrue",     new (Fields_default()).SFBool ()),
   ]),
   getTypeName: function ()
   {
      return "BooleanTrigger";
   },
   getComponentName: function ()
   {
      return "EventUtilities";
   },
   getContainerField: function ()
   {
      return "children";
   },
   initialize: function ()
   {
      EventUtilities_X3DTriggerNode.prototype.initialize.call (this);

      this ._set_triggerTime .addInterest ("set_triggerTime__", this);
   },
   set_triggerTime__: function ()
   {
      this ._triggerTrue = true;
   },
});

/* harmony default export */ const EventUtilities_BooleanTrigger = (BooleanTrigger);

;// CONCATENATED MODULE: ./src/x_ite/Components/EventUtilities/IntegerSequencer.js
/* -*- Mode: JavaScript; coding: utf-8; tab-width: 3; indent-tabs-mode: tab; c-basic-offset: 3 -*-
 *******************************************************************************
 *
 * DO NOT ALTER OR REMOVE COPYRIGHT NOTICES OR THIS FILE HEADER.
 *
 * Copyright create3000, Scheffelstraße 31a, Leipzig, Germany 2011.
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
 * Copyright 2015, 2016 Holger Seelig <holger.seelig@yahoo.de>.
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
 * along with X_ITE.  If not, see <http://www.gnu.org/licenses/gpl.html> for a
 * copy of the GPLv3 License.
 *
 * For Silvio, Joy and Adi.
 *
 ******************************************************************************/








function IntegerSequencer (executionContext)
{
   EventUtilities_X3DSequencerNode.call (this, executionContext);

   this .addType ((X3DConstants_default()).IntegerSequencer);
}

IntegerSequencer .prototype = Object .assign (Object .create (EventUtilities_X3DSequencerNode.prototype),
{
   constructor: IntegerSequencer,
   [Symbol .for ("X_ITE.X3DBaseNode.fieldDefinitions")]: new (FieldDefinitionArray_default()) ([
      new (X3DFieldDefinition_default()) ((X3DConstants_default()).inputOutput, "metadata",      new (Fields_default()).SFNode ()),
      new (X3DFieldDefinition_default()) ((X3DConstants_default()).inputOnly,   "set_fraction",  new (Fields_default()).SFFloat ()),
      new (X3DFieldDefinition_default()) ((X3DConstants_default()).inputOnly,   "previous",      new (Fields_default()).SFBool ()),
      new (X3DFieldDefinition_default()) ((X3DConstants_default()).inputOnly,   "next",          new (Fields_default()).SFBool ()),
      new (X3DFieldDefinition_default()) ((X3DConstants_default()).inputOutput, "key",           new (Fields_default()).MFFloat ()),
      new (X3DFieldDefinition_default()) ((X3DConstants_default()).inputOutput, "keyValue",      new (Fields_default()).MFInt32 ()),
      new (X3DFieldDefinition_default()) ((X3DConstants_default()).outputOnly,  "value_changed", new (Fields_default()).SFInt32 ()),
   ]),
   getTypeName: function ()
   {
      return "IntegerSequencer";
   },
   getComponentName: function ()
   {
      return "EventUtilities";
   },
   getContainerField: function ()
   {
      return "children";
   },
   initialize: function ()
   {
      EventUtilities_X3DSequencerNode.prototype.initialize.call (this);

      this ._keyValue .addInterest ("set_index__", this);
   },
   getSize: function ()
   {
      return this ._keyValue .length;
   },
   sequence: function (index)
   {
      this ._value_changed = this ._keyValue [index];
   },
});

/* harmony default export */ const EventUtilities_IntegerSequencer = (IntegerSequencer);

;// CONCATENATED MODULE: ./src/x_ite/Components/EventUtilities/IntegerTrigger.js
/* -*- Mode: JavaScript; coding: utf-8; tab-width: 3; indent-tabs-mode: tab; c-basic-offset: 3 -*-
 *******************************************************************************
 *
 * DO NOT ALTER OR REMOVE COPYRIGHT NOTICES OR THIS FILE HEADER.
 *
 * Copyright create3000, Scheffelstraße 31a, Leipzig, Germany 2011.
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
 * Copyright 2015, 2016 Holger Seelig <holger.seelig@yahoo.de>.
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
 * along with X_ITE.  If not, see <http://www.gnu.org/licenses/gpl.html> for a
 * copy of the GPLv3 License.
 *
 * For Silvio, Joy and Adi.
 *
 ******************************************************************************/








function IntegerTrigger (executionContext)
{
   EventUtilities_X3DTriggerNode.call (this, executionContext);

   this .addType ((X3DConstants_default()).IntegerTrigger);
}

IntegerTrigger .prototype = Object .assign (Object .create (EventUtilities_X3DTriggerNode.prototype),
{
   constructor: IntegerTrigger,
   [Symbol .for ("X_ITE.X3DBaseNode.fieldDefinitions")]: new (FieldDefinitionArray_default()) ([
      new (X3DFieldDefinition_default()) ((X3DConstants_default()).inputOutput, "metadata",     new (Fields_default()).SFNode ()),
      new (X3DFieldDefinition_default()) ((X3DConstants_default()).inputOnly,   "set_boolean",  new (Fields_default()).SFBool ()),
      new (X3DFieldDefinition_default()) ((X3DConstants_default()).inputOutput, "integerKey",   new (Fields_default()).SFInt32 (-1)),
      new (X3DFieldDefinition_default()) ((X3DConstants_default()).outputOnly,  "triggerValue", new (Fields_default()).SFInt32 ()),
   ]),
   getTypeName: function ()
   {
      return "IntegerTrigger";
   },
   getComponentName: function ()
   {
      return "EventUtilities";
   },
   getContainerField: function ()
   {
      return "children";
   },
   initialize: function ()
   {
      EventUtilities_X3DTriggerNode.prototype.initialize.call (this);

      this ._set_boolean .addInterest ("set_boolean__", this);
   },
   set_boolean__: function ()
   {
      this ._triggerValue = this ._integerKey;
   },
});

/* harmony default export */ const EventUtilities_IntegerTrigger = (IntegerTrigger);

;// CONCATENATED MODULE: ./src/x_ite/Components/EventUtilities/TimeTrigger.js
/* -*- Mode: JavaScript; coding: utf-8; tab-width: 3; indent-tabs-mode: tab; c-basic-offset: 3 -*-
 *******************************************************************************
 *
 * DO NOT ALTER OR REMOVE COPYRIGHT NOTICES OR THIS FILE HEADER.
 *
 * Copyright create3000, Scheffelstraße 31a, Leipzig, Germany 2011.
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
 * Copyright 2015, 2016 Holger Seelig <holger.seelig@yahoo.de>.
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
 * along with X_ITE.  If not, see <http://www.gnu.org/licenses/gpl.html> for a
 * copy of the GPLv3 License.
 *
 * For Silvio, Joy and Adi.
 *
 ******************************************************************************/








function TimeTrigger (executionContext)
{
   EventUtilities_X3DTriggerNode.call (this, executionContext);

   this .addType ((X3DConstants_default()).TimeTrigger);
}

TimeTrigger .prototype = Object .assign (Object .create (EventUtilities_X3DTriggerNode.prototype),
{
   constructor: TimeTrigger,
   [Symbol .for ("X_ITE.X3DBaseNode.fieldDefinitions")]: new (FieldDefinitionArray_default()) ([
      new (X3DFieldDefinition_default()) ((X3DConstants_default()).inputOutput, "metadata",    new (Fields_default()).SFNode ()),
      new (X3DFieldDefinition_default()) ((X3DConstants_default()).inputOnly,   "set_boolean", new (Fields_default()).SFBool ()),
      new (X3DFieldDefinition_default()) ((X3DConstants_default()).outputOnly,  "triggerTime", new (Fields_default()).SFTime ()),
   ]),
   getTypeName: function ()
   {
      return "TimeTrigger";
   },
   getComponentName: function ()
   {
      return "EventUtilities";
   },
   getContainerField: function ()
   {
      return "children";
   },
   initialize: function ()
   {
      EventUtilities_X3DTriggerNode.prototype.initialize.call (this);

      this ._set_boolean .addInterest ("set_boolean__", this);
   },
   set_boolean__: function ()
   {
      this ._triggerTime = this .getBrowser () .getCurrentTime ();
   },
});

/* harmony default export */ const EventUtilities_TimeTrigger = (TimeTrigger);

;// CONCATENATED MODULE: ./src/assets/components/EventUtilities.js
/*******************************************************************************
 *
 * DO NOT ALTER OR REMOVE COPYRIGHT NOTICES OR THIS FILE HEADER.
 *
 * Copyright create3000, Scheffelstraße 31a, Leipzig, Germany 2011.
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
 * Copyright 2015, 2016 Holger Seelig <holger.seelig@yahoo.de>.
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
 * along with X_ITE.  If not, see <http://www.gnu.org/licenses/gpl.html> for a
 * copy of the GPLv3 License.
 *
 * For Silvio, Joy and Adi.
 *
 ******************************************************************************/













Components_default().addComponent ({
   name: "EventUtilities",
   types:
   {
      BooleanFilter:    EventUtilities_BooleanFilter,
      BooleanSequencer: EventUtilities_BooleanSequencer,
      BooleanToggle:    EventUtilities_BooleanToggle,
      BooleanTrigger:   EventUtilities_BooleanTrigger,
      IntegerSequencer: EventUtilities_IntegerSequencer,
      IntegerTrigger:   EventUtilities_IntegerTrigger,
      TimeTrigger:      EventUtilities_TimeTrigger,
   },
   abstractTypes:
   {
      X3DSequencerNode: EventUtilities_X3DSequencerNode,
      X3DTriggerNode:   EventUtilities_X3DTriggerNode,
   },
});

/* harmony default export */ const EventUtilities = ((/* unused pure expression or super */ null && (undefined)));

/******/ })()
;