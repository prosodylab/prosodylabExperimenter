


## Mac issues with local server when running on Monterrey 

* to run the experiment locally, you need php. The Monterey operating system no longer includes php. It can be installed using homebrew (https://stackoverflow.com/questions/69786222/zsh-command-not-found-php):    
    brew install php

## Instructions for running on Windows


I installed Git Bash years ago and have no memory of how I did it. Hopefully [this tutorial](https://www.stanleyulili.com/git/how-to-install-git-bash-on-windows/) can help you if you have not yet installed Git Bash.

### Install PHP

I was successfull installing PHP following [this tutorial](https://www.sitepoint.com/how-to-install-php-on-windows/). Scroll down to "How to Install PHP (about halfway down the page) and follow instructions for steps 1-4. I didn't do anything related to Apache and was able to run runLocally.sh successfully with the other tools described in this document. 

### Edit runLocally.sh

The contents of runLocally.sh should be the following:

```{bash}
/usr/bin/open -a "/Applications/Google Chrome.app" "http://localhost:8000/$1"
php -S localhost:8000
```
To edit runLocally.sh, right click on the file, click on "Open with...", click on "More apps," and select the text editor of your choice. Alternatively, you may have the choice to go directly to your favorite text editor. For example, when I right click, I get the option to "Edit with Notepad++," so I don't have to go through the hoops of choosing my text editor every time. 

Edit the first line to reflect the location of the file chrome.exe on your computer. For me, the first line becomes: 

```{bash}
"C:\Program Files (x86)\Google\Chrome\Application\chrome.exe" "http://localhost:8000/$1"
```
To find the exact path on your computer, look for chrome.exe in a similar place as shown here. When you find chrome.exe, click into the bar at the top of the file explorer showing the path and copy the path. Paste it into the template above, and don't forget to add chrome.exe at the end.

### Run runLocally.sh

Right-click somewhere in the folder where runLocally.sh lives and select "Git Bash Here." (Alternatively, you can open Git Bash anywhere and cd into the folder, but if you don't know how to do that, you don't need to.) In the Git Bash window, type 

```{bash}
sh runLocally.sh
```
If everything is set up right, chrome will now open with your experiment. Congrats!
