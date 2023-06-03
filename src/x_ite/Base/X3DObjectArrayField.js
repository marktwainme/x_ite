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

import X3DField      from "./X3DField.js";
import X3DArrayField from "./X3DArrayField.js";

const
   _target = Symbol (),
   _proxy  = Symbol (),
   _insert = Symbol (),
   _erase  = Symbol ();

const handler =
{
   get: function (target, key)
   {
      const value = target [key];

      if (value !== undefined)
         return value;

      if (typeof key === "string")
      {
         const
            array = target .getValue (),
            index = +key;

         if (Number .isInteger (index))
         {
            if (index >= array .length)
               target .resize (index + 1);

            return array [index] .valueOf ();
         }
         else
         {
            return target [key];
         }
      }
   },
   set: function (target, key, value)
   {
      if (key in target)
      {
         target [key] = value;
         return true;
      }

      const
         array = target .getValue (),
         index = +key;

      if (index >= array .length)
         target .resize (index + 1);

      array [index] .setValue (value);

      return true;
   },
   has: function (target, key)
   {
      if (Number .isInteger (+key))
         return key < target .getValue () .length;

      return key in target;
   },
   ownKeys: function (target)
   {
      return Object .keys (target .getValue ());
   },
   getOwnPropertyDescriptor: function (target, key)
   {
      if (typeof key !== "string")
         return;

      const index = +key;

      if (Number .isInteger (index) && index < target .getValue () .length)
         return Object .getOwnPropertyDescriptor (target .getValue (), key);
   },
};

function X3DObjectArrayField (value)
{
   const proxy = new Proxy (this, handler);

   X3DArrayField .call (this, [ ]);

   this [_target] = this;
   this [_proxy]  = proxy;

   this .push (... value);

   return proxy;
}

X3DObjectArrayField .prototype = Object .assign (Object .create (X3DArrayField .prototype),
{
   constructor: X3DObjectArrayField,
   [_target]: null,
   [_proxy]: null,
   [Symbol .iterator]: function* ()
   {
      const
         target = this [_target],
         array  = target .getValue ();

      for (const value of array)
         yield value .valueOf ();
   },
   getTarget: function ()
   {
      return this [_target];
   },
   copy: function ()
   {
      const
         target = this [_target],
         copy   = target .create (),
         array  = target .getValue ();

      copy .push (... array);
      copy .setModificationTime (0);

      return copy;
   },
   equals: function (array)
   {
      const
         target = this [_target],
         a      = target .getValue (),
         b      = array .getValue (),
         length = a .length;

      if (a === b)
         return true;

      if (length !== b .length)
         return false;

      for (let i = 0; i < length; ++ i)
      {
         if (!a [i] .equals (b [i]))
            return false;
      }

      return true;
   },
   isDefaultValue: function ()
   {
      return this .length === 0;
   },
   set: function (value)
   {
      const
         target    = this [_target],
         array     = target .getValue (),
         newLength = value .length;

      target .resize (newLength, undefined, true);

      for (let i = 0; i < newLength; ++ i)
         array [i] .set (value [i] instanceof X3DField ? value [i] .getValue () : value [i]);
   },
   setValue: function (value)
   {
      const target = this [_target];

      target .set (value instanceof X3DObjectArrayField ? value .getValue () : value);
      target .addEvent ();
   },
   unshift: function (value)
   {
      const
         target = this [_target],
         array  = target .getValue ();

      for (let i = arguments .length - 1; i >= 0; -- i)
      {
         const field = new (target .getSingleType ()) ();

         field .setValue (arguments [i]);
         target .addChildObject (field);
         array .unshift (field);
      }

      target .addEvent ();

      return array .length;
   },
   shift: function ()
   {
      const
         target = this [_target],
         array  = target .getValue ();

      if (array .length)
      {
         const
            field  = array .shift (),
            result = field .valueOf ();

         target .removeChildObject (field);
         target .addEvent ();

         return result;
      }
   },
   push: function (value)
   {
      const
         target = this [_target],
         array  = target .getValue ();

      for (const argument of arguments)
      {
         const field = new (target .getSingleType ()) ();

         field .setValue (argument);
         target .addChildObject (field);
         array .push (field);
      }

      target .addEvent ();

      return array .length;
   },
   pop: function ()
   {
      const
         target = this [_target],
         array  = target .getValue ();

      if (array .length)
      {
         const
            field  = array .pop (),
            result = field .valueOf ();

         target .removeChildObject (field);
         target .addEvent ();

         return result;
      }
   },
   splice: function (index, deleteCount, ... insertValues)
   {
      const
         target = this [_target],
         array  = target .getValue (),
         length = array .length;

      if (arguments .length === 0)
         return new (target .constructor) ();

      if (arguments .length < 2)
         deleteCount = length;

      const result = target [_erase] (index, deleteCount);

      if (insertValues .length)
         target [_insert] (index, insertValues);

      return result;
   },
   [_insert]: function (index, array)
   {
      const
         target = this [_target],
         args   = [ ];

      for (const value of array)
      {
         const field = new (target .getSingleType ()) ();

         field .setValue (value);
         target .addChildObject (field);
         args .push (field);
      }

      target .getValue () .splice (index, 0, ... args);
      target .addEvent ();
   },
   [_erase]: function (index, deleteCount)
   {
      const
         target = this [_target],
         values = target .getValue () .splice (index, deleteCount),
         result = new (target .constructor) (values);

      for (const value of values)
         target .removeChildObject (value);

      target .addEvent ();

      return result;
   },
   resize: function (size, value, silently)
   {
      const
         target = this [_target],
         array  = target .getValue (),
         length = array .length;

      if (size < length)
      {
         for (let i = size; i < length; ++ i)
            target .removeChildObject (array [i]);

         array .length = size;

         if (!silently)
            target .addEvent ();
      }
      else if (size > length)
      {
         for (let i = length; i < size; ++ i)
         {
            const field = new (target .getSingleType ()) ();

            if (value !== undefined)
               field .setValue (value);

            target .addChildObject (field);
            array .push (field);
         }

         if (!silently)
            target .addEvent ();
      }
   },
   addChildObject: function (value)
   {
      value .addParent (this [_proxy]);
   },
   removeChildObject: function (value)
   {
      value .removeParent (this [_proxy]);
      value .dispose ();
   },
   reverse: function ()
   {
      const target = this [_target];

      target .getValue () .reverse ();
      target .addEvent ();

      return target [_proxy];
   },
   sort: function (compareFn)
   {
      const target = this [_target];

      Array .prototype .sort .call (this, compareFn);
      target .addEvent ();

      return target [_proxy];
   },
   toStream: function (generator)
   {
      const
         target = this [_target],
         array  = target .getValue ();

      switch (array .length)
      {
         case 0:
         {
            generator .string += "[";
            generator .string += generator .TidySpace ();
            generator .string += "]";
            break;
         }
         case 1:
         {
            generator .PushUnitCategory (target .getUnit ());

            array [0] .toStream (generator);

            generator .PopUnitCategory ();
            break;
         }
         default:
         {
            generator .PushUnitCategory (target .getUnit ());

            generator .string += "[";
            generator .string += generator .ListStart ();
            generator .IncIndent ();

            for (let i = 0, length = array .length - 1; i < length; ++ i)
            {
               generator .string += generator .ListIndent ();
               array [i] .toStream (generator);
               generator .string += generator .Comma ();
               generator .string += generator .ListBreak ();
            }

            generator .string += generator .ListIndent ();
            array .at (-1) .toStream (generator);

            generator .string += generator .ListEnd ();
            generator .DecIndent ();
            generator .string += generator .ListIndent ();
            generator .string += "]";

            generator .PopUnitCategory ();
            break;
         }
      }
   },
   toVRMLStream: function (generator)
   {
      this .toStream (generator);
   },
   toXMLStream: function (generator)
   {
      const
         target = this [_target],
         length = target .length;

      if (length)
      {
         const array = target .getValue ();

         generator .PushUnitCategory (target .getUnit ());

         for (let i = 0, length = array .length - 1; i < length; ++ i)
         {
            array [i] .toXMLStream (generator);
            generator .string += generator .Comma ();
            generator .string += generator .TidySpace ();
         }

         array .at (-1) .toXMLStream (generator);

         generator .PopUnitCategory ();
      }
   },
   toJSONStream: function (generator)
   {
      const
         target = this [_target],
         length = target .length;

      if (length)
      {
         const value = this .getValue ();

         generator .PushUnitCategory (target .getUnit ());

         generator .string += '[';
         generator .string += generator .ListBreak ();
         generator .string += generator .IncIndent ();

         for (let i = 0, n = length - 1; i < n; ++ i)
         {
            generator .string += generator .ListIndent ();

            value [i] .toJSONStreamValue (generator);

            generator .string += ',';
            generator .string += generator .ListBreak ();
         }

         generator .string += generator .ListIndent ();

         value .at (-1) .toJSONStreamValue (generator);

         generator .string += generator .ListBreak ();
         generator .string += generator .DecIndent ();
         generator .string += generator .ListIndent ();
         generator .string += ']';

         generator .PopUnitCategory ();
      }
      else
      {
         generator .string += '[';
         generator .string += generator .TidySpace ();
         generator .string += ']';
      }
   },
});

for (const key of Reflect .ownKeys (X3DObjectArrayField .prototype))
   Object .defineProperty (X3DObjectArrayField .prototype, key, { enumerable: false });

Object .defineProperty (X3DObjectArrayField .prototype, "length",
{
   get: function () { return this [_target] .getValue () .length; },
   set: function (value) { this [_target] .resize (value); },
});

export default X3DObjectArrayField;
