---
layout: assignment
permalink: /Assignments/git
title: "CS375: Software Engineering - git"


info:
  coursenum: CS375
  points: 100
  goals:
    - To use git to set up a shared software repository

  readings:
    - rlink: https://git-scm.com/book/en/v2
      rtitle: Git Reference Book
    - rlink: https://www.billmongan.com/posts/2020/02/github/
      rtitle: "Using Git with Github by William M. Mongan"
    - rlink: https://github.com/BrynMawr-CS223-S22/git-workshop
      rtitle: "Git Workshop from Bryn Mawr College"
      
tags:
  - git

---

In this assignment, you will set up a git repository, share it with others, and practice commit, push, and pull operations from the repository.

You will also create and add an ssh key to your git repository for password-less access.

Finally, you will induce and resolve a merge conflict with your partners.

### Background

#### Installing git

If you do not already have git installed (for example, if you open a terminal and type git, but the command does not execute), you can install it from [https://git-scm.com/](https://git-scm.com/).

#### Adding your ssh key to github

SSH Keys allow you to present a certificate to the GitHub server that authenticates your user account from your computer.  It is an alternative to password-based authentication.  You can create an SSH key, which will create two files on your "home directory" called ``.ssh/id_rsa`` and ``.ssh/id_rsa.pub``.  The ``.ssh/id_rsa.pub`` file contains your ***public key*** and is the file you will share with GitHub.  The ***private key*** in the other file corresponds to your public key, and, as the name implies, should not be shared with anyone (as it will enable authentication against the public key).

![Creating an SSH Key](../images/github/ssh-keygen.gif)

Once the key is created, you can copy the public key text and paste it on the GitHub website to add it.  It's a good idea to name the key, in case you get a new computer and start a new key; it's a good practice to remove unused public keys from GitHub and other servers.

![Uploading an SSH Public Key to GitHub for Authentication](../images/github/add-ssh-key-github.gif)

If you are using [TortoiseGit](https://tortoisegit.org/), you can use a tool to manage your SSH keys from Windows.  See [this article](https://help.cloudforge.com/hc/en-us/articles/215243143-Configure-TortoiseGIT-client-to-work-with-SSH-keys-on-Windows) for details.

The video below demonstrates how to create and add your ssh key to your github account.

<iframe width="560" height="315" src="https://www.youtube.com/embed/zl7fgkRjG_c" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>

##### Summary

In summary, you can execute the following commands to create an SSH Key.

```
ssh-keygen -t rsa
cat ~/.ssh/id_rsa.pub # outputs your public key so you can copy and paste it
```

Copy this key and paste it into your github user settings menu under SSH Keys.  You can now execute ssh commands that login to your account without typing in your password!  These keys allow you to encrypt data: data are encrypted using your public key by anyone in the world, and decrypted using your private key (which only you have).

Interestingly, you can encrypt data with your private key, which will prove to the world that you generated that data.  This is because anyone with your public key can decrypt your message, and only you could have generated it with your private key.  This is known as generating a digital signature, and it is used to facilitate passwordless login.

Treat your private key like a password!  If you lose it, you should generate a new one and remove the old public key from any services you use.

#### Configuring your git Client

You can add your name and email address to your git client by running these commands, which will associate your commits to the repository with you.

```
git config --global user.name "Your Name"
git config --global user.email "your.name@email.server"
```

#### Creating and Sharing a git Repository

Follow the steps below to create a github repository.  Your project will present you an ssh link (do not use the https link) under the "Code" button once you create the project.

![Creating a GitHub Repository](../images/github/create-repo-github.gif)

#### Checking out your Repository

Cloning the repository downloads it to your local computer.  You can do this as many times as you wish, and synchronize across them.  You can even share the repository with other users, and they can operate on the repository locally as well.

![Cloning a GitHub Repository](../images/github/git-clone.gif)

#### Pushing and Pulling to your Repository

Sometimes, you'll have private files in your repository directory that are important, but too senstive (or just custom to each local computer) to save to the remote repository in the cloud.  For this reason, you'll explicitly ***add*** each file that you want to upload to the cloud.  Note that you also add files that you've modified even if they already exist.  

Once you've added your file(s), you can ***commit*** your changes to the repository.  This creates a log timestamp that you can see in the repository to track who did what and when.  You can even roll back your repository to any point in time marked by one of these commits.  It's a good idea to commit relatively often, whenever a major milestone is reached that you might like to revert to or review someday.  It's also a good idea to specify a commit log message so that these commits make sense beyond simply what files were modified and how.  This is specified with the ``-m`` flag to ``git commit``.

Before git came along, repositories would often automatically sync to the remote in the cloud as soon as a commit was made.  This might even seem reasonable at first glance.  But not all computers are connected to the Internet at all times, and so it is helpful to separate these operations so that you can make commits while offline.  After you have made one or more commits, you can ***push*** them to the remote in the cloud.

![Add, Commit, and Push to a GitHub Repository](../images/github/git-commit-push.gif)

It is strongly recommended that you **pull** from the repository with a `git pull` command prior to pushing your own commits using `git push` to resolve any conflicts that may exist.  More on this later.

##### Removing Files

In addition to adding files, you can also remove files from the repository with ``git rm``.  You'll commit and push these changes just like with add operations.  

One final note: it's a good practice to ***pull*** the repository from the remote cloud before performing a push operation.  In fact, it's required if anyone else has pushed commits that you have not yet downloaded.  You can use the ``git pull`` command to do this, and should plan on doing this at least any time you push.  

![Removing Files, and Pulling to Update Remote Changes](../images/github/git-rm-and-pull.gif)

#### Creating a Branch

Things can get messy if there are many people working on many different parts of a repository with different objectives in mind.  It is nice to have a "sandbox" to work in that is separate from the rest of the team, and then to merge that sandbox back into the ***main*** repository when you are finished.  These "sandboxes" are called ***branches***.  You can create a branch using the ``git branch <branch name>`` command, and switch between branches using the ``git checkout <branch name>`` command.  Git provides a shortcut when creating a new branch that executes both operations: ``git checkout -b <branch name>``.

Initially, the branch will be identical to the current branch, but it will be on its own independent commit timeline.

![Creating a Branch](../images/github/git-branch.gif)

You can commit and push to your branch like before.  When pushing to (or pulling from) a particular branch, you can specify the branch to git via ``git push <remote> <branch name>``.  By default, the GitHub remote is called ``origin``, so you would enter ``git push origin <branch name>``.  You can have more than one remote, which would allow you to sync with multiple remote servers or to create custom actions to occur when you push commits.  This is beyond the scope of this article as we won't need it for GitHub classroom, but if you're interested, you can find out more [here](https://help.github.com/en/github/using-git/adding-a-remote).

With GitHub, it's possible that a single user or subset of users are in charge of the ***main*** branch, into which these branches would often be merged.  To request a code review and merge of a branch, you can create a ***Pull Request*** that seeks a review, comments, and ultimately a merge of the branch.

#### Merging a Branch

You can merge a branch into your existing branch using the ``git merge <branch name>`` operation.  You can ***checkout*** the target branch first, and then merge the other branch in.

![Merging another Branch into the Current Branch](../images/github/git-merge-no-commit-just-push.gif)

Notice that you do not need to commit after performing a merge: the merge *is* a commit on your current branch.  If you perform a ``git commit``, it will provide you a helpful reminder about this.  Instead, you can go ahead and push to the remote GitHub server when you are ready.

#### Resolving a Conflict

Sometimes, team members make changes to the same parts of the same files in different branches (or from different local checkouts).  A ***conflict*** occurs when this happens.  Git offers you some guidance in how to resolve these, and allows you to specify the details as a new commit.  You can find more details on how to do this [here](https://help.github.com/en/github/collaborating-with-issues-and-pull-requests/resolving-a-merge-conflict-using-the-command-line).

At the console, you can edit the file in conflict and manually resolve the conflict.  The file will show the conflict like this:

```
<<<<<<<
Data on the server
======
Data from your local commit
>>>>>>>
```

Alternatively, you can type `git checkout --theirs` to use the server copy and overwrite your changes, or `git checkout --ours` to use your version.  Add, commit and push the repository like you would for any other modified file.

### What to Do

1. Create a git repository and share it with the members of your group.  Everyone should do this individually!
2. Commit files to everyone's repositories, including your own.
3. Create a branch, make some edits, and merge the branch.
4. Create a conflict, resolve it, and check in the resolved file.
5. Share the repository with the instructor, who can verify your work using your git commit history.  Submit the git ssh link.
6. Create a branch in your repository called gh-pages, and add a file called index.md.  Put some text into that file, commit and push it.  In the settings for your repository, enable github pages, and go to https://your-git-username.github.io/your-github-repository-name.  You should see your content!
