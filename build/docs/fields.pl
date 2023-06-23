#!/usr/bin/perl
use v5.10.0;
use utf8;
use open qw/:std :utf8/;

use Cwd;
use List::MoreUtils qw(first_index);


system "wget -q --output-document - https://www.web3d.org/x3d/content/X3dTooltips.html > /tmp/tooltips.html"
   unless -f "/tmp/tooltips.html";
$tooltips = `cat /tmp/tooltips.html`;

@td = $tooltips =~ m|<td.*?</td.*?>|sgo;

s|</?.*?>||sgo   foreach @td;
s/&nbsp;/ /sgo   foreach @td;
s/\s+/ /sgo      foreach @td;
s/^\s+|\s+$//sgo foreach @td;

#say @td;

sub node {
   $filename = shift;
   chomp $filename;

   $filename =~ m|([^/]+)/([^/]+)\.js$|o;

   $componentName = $1;
   $typeName      = $2;

   return if $componentName =~ /^Annotation$/o;
   return if $typeName =~ /^X3D/o;

   return unless $typeName =~ /^Delay$/o;
   say "$componentName $typeName";

   $md     = "$cwd/docs/_posts/components/$componentName/$typeName.md";
   $file   = `cat $md`;
   @fields = map { /\*\*(.*?)\*\*/o; $_ = $1 } $file =~ /###\s*[SM]F\w+.*/go;

   $file = fill_empty_field ($_, $typeName, $file) foreach @fields;
   exit;
}

sub fill_empty_field {
   $name     = shift;
   $typeName = shift;
   $file     = shift;

   return $file unless $file =~ /###.*?\*\*$name\*\*.*?[\s\n]+###/;

   @node = @td [(first_index { /^$typeName$/ } @td) .. $#td];
   @node = @node [0 .. (first_index { /^$/ } @node)];

   @field = @node [(first_index { /$name/ } @node) + 1 .. $#node];
   $field = shift @field;

   say "  $name '$field'";

   return $file;
}

$cwd = getcwd ();

node $_ foreach sort `find $cwd/src/x_ite/Components -type f -mindepth 2`;
