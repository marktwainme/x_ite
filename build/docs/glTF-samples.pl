#!/usr/bin/perl
use v5.10.0;
use utf8;
use open qw/:std :utf8/;

use Cwd;

say "Updating glTF examples ...";

$cwd = getcwd ();

$page    = $cwd . "/docs/laboratory/gltf-sample-viewer.html";
$viewer  = `cat $page`;
$random  = $cwd . "/../media/docs/glTF/";
$samples = "/Volumes/Home/X3D/glTF/";
$media   = "https://create3000.github.io/media/glTF";
$khronos = "https://raw.githubusercontent.com/KhronosGroup";

sub media {
   say "Getting media files ...";

   @files = `find '$random' -type f  -name "*.gltf" -o -name "*.glb" | sort`;

   my $string = "const models = [\n";

   foreach (map { s|$random/||r } @files)
   {
      chomp;
      $string .= "   \"$media/$_\",\n";
   }

   $string .= "];\n";

   return $string;
}

sub glTF {
   my $folder = shift;
   my $suffix = shift;
   my $var    = shift;

   say "Getting $folder files ...";

   @models = `find '$samples/glTF-Sample-Models/2.0'    -type f -name "*$suffix" -not -path '*/\.*'`;
   @assets = `find '$samples/glTF-Sample-Assets/Models' -type f -name "*$suffix" -not -path '*/\.*'`;
   @files  = (@models, @assets);

   s|/glTF-Sample-Models/|/glTF-Sample-Models/master/| foreach @files;
   s|/glTF-Sample-Assets/|/glTF-Sample-Assets/master/| foreach @files;
   s|$samples/|| foreach @files;

   @files = sort grep { m|/$folder/| } @files;

   my $string = "const $var = [\n";

   foreach (@files)
   {
      chomp;
      $string .= "   \"$khronos/$_\",\n";
   }

   $string .= "];\n";

   return $string;
}

chdir "$samples/glTF-Sample-Models";
system "git pull origin";
chdir "$samples/glTF-Sample-Assets";
system "git pull origin";

$string = "";
$string .= "// TESTS_BEGIN\n\n";
$string .= media;
$string .= "\n";
$string .= glTF ("glTF", ".gltf", "glTF");
$string .= "\n";
$string .= glTF ("glTF-Binary", ".glb", "glb");
$string .= "\n";
$string .= glTF ("glTF-Draco", ".gltf", "draco");
$string .= "\n";
$string .= glTF ("glTF-Embedded", ".gltf", "embedded");
$string .= "\n";
$string .= glTF ("glTF-IBL", ".gltf", "ibl");
$string .= "\n";
$string .= glTF ("glTF-KTX-BasisU", ".gltf", "ktx");
$string .= "\n// TESTS_END";

$viewer =~ s|// TESTS_BEGIN.*?// TESTS_END|$string|s;

open PAGE, ">", $page;
print PAGE $viewer;
close PAGE;
