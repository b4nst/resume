# Copyright © Loft Orbital Solutions Inc.

{
  description = "virtual environments";
  
  inputs = {
    nixpkgs.url = "nixpkgs/nixos-unstable";
    flake-utils.url = "github:numtide/flake-utils";
    devshell.url = "github:numtide/devshell";
  };

  inputs.flake-compat = {
    url = "github:edolstra/flake-compat";
    flake = false;
  };

  outputs =
    {
      self,
      flake-utils,
      devshell,
      nixpkgs,
      ...
    }:
    flake-utils.lib.eachDefaultSystem (system: {
      devShells.default =
        let
          pkgs = import nixpkgs {
            inherit system;

            overlays = [ devshell.overlays.default ];
          };
        in
        pkgs.devshell.mkShell {
          name = "resume";

          packages = [
            pkgs.nodejs_24
            pkgs.bun
            pkgs.gnumake
            pkgs.python3
          ];

          env = [];

          commands = [
            {
              name = "build";
              command = "make clean && make";
              category = "build";
              help = "Build the resume";
            }
            {
              name = "dev";
              command = "make clean && make && bun run preview";
              category = "dev";
              help = "Build and serve the resume locally";
            }
            {
              name = "clean";
              command = "make clean";
              category = "chore";
              help = "Clean build artifacts";
            }
          ];
        };
    });
}
