# Useful Mac Commands 

## Terminal 
### Drive/Disk/Volume Management 
List all drives, partitions, volumes
  ```sh
  diskutil list
  ```
Unmount the Specified Drive
  ```sh
  diskutil unmount /dev/disk1s2
  ```
Mount a specified drive 
  ```sh
  diskutil mount /dev/disk1s2
  ```
Unmount & remount a drive / volume in a single command
  ```sh
  diskutil unmount /dev/disk1s2; diskutil mount
  ```
  with feedback:
  ```sh
  diskutil unmount /dev/disk1s2;diskutil mount /dev/disk1s2;echo
  ```

## Launchpad 
Reset Launchpad layout 
```sh 
defaults write com.apple.dock ResetLaunchPad -bool true; killall Dock
``` 
## Dock 
### Dock Icons 
Enable Translucent Dock Icons for Hidden Mac OS X Apps
```sh
defaults write com.apple.Dock showhidden -bool YES; killall Dock
```
Disable Translucent Dock Icons for Hidden Mac OS X Apps 
```sh
defaults write com.apple.Dock showhidden -bool NO;killall Dock
```
### Showing & Hiding 
Remove the Auto-Hide Dock Delay
```sh
defaults write com.apple.Dock autohide-delay -float 0 && killall Dock
```
## Mission Control 
Speed up Mission Control Animations 
* `0.15` → Fast by maintain nice animations 
* `0.1` → Very fast 
* `0.2`-`0.25` → roughly the standard animation speed  
* `0` → totally disable animations 
* `expose-animation-duration` → value for default animation speed
```sh
defaults write com.apple.dock expose-animation-duration -float 0.15; killall Dock
```
## Finder 
### File Management 
Always Show the User Library Folder
```sh
chflags nohidden ~/Library/
```
Always Show Hidden Files in the Finder
```sh
defaults write com.apple.finder AppleShowAllFiles -bool YES && killall Finder
```
Change Where Screen Shots Are Saved To
```sh
defaults write com.apple.screencapture location ~/Pictures/Screenshots
```
Change the Default Screen Shot Image Type
```sh
defaults write com.apple.screencapture type jpg && killall SystemUIServer
```
### Quick Look 
Enable Text Selection in Quick Look Windows
```sh
defaults write com.apple.finder QLEnableTextSelection -bool TRUE;killall Finder
```
### Desktop 
Hide Desktop Icons Completely
```sh
defaults write com.apple.finder CreateDesktop -bool false && killall Finder
```
## System 
Show System Info at the Login Screen
```sh
sudo defaults write /Library/Preferences/com.apple.loginwindow AdminHostInfo HostName
```