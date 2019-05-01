# fileto

A little library to work with Javascript File objects.

`This repository was created for use by CDC programs to collaborate on public health surveillance related projects in support of the CDC Surveillance Strategy.  Github is not hosted by the CDC, but is used by CDC and its partners to share information and collaborate on software.`

## impetus

Suppose we have an HTML file input, like so:

```html
<input type="file" id="fileinput" />
```

Now, let's get the corresponding File object in Javascript.

```javascript
var file = document.getElementById("fileinput");
```

What can we do with this? We can use [its metadata](https://developer.mozilla.org/en-US/docs/Web/API/File#Properties), or we can read it with a [FileReader](https://developer.mozilla.org/en-US/docs/Web/API/FileReader), and not a lot more than that. More importantly, if we change the contents of the input, the file object goes \*poof!\* and ceases to be. In a complex, file-oriented web application, this may be extremely undesirable. So, to solve this, we can stash away the contents of the file. `fileto` is a little library to make that a little bit easier.

## functions

Suppose we load a textfile called `test.txt` into the above file input. Its contents are:

```text
foobar

```

To get the actual File object, we'll need to listen to the change event:

```javascript
file.addEventListener("change", function(){ /* ...Our code here... */ });
```

Then `fileto` can do the following:

**`fileto.object(<file>)`** - Unwraps a File object.

```javascript
fileto.object(this.files[0]);
/* {
  "name":"test.txt",
  "lastModified":1544812259347,
  "size":7,
  "type":"text/plain"
} */
```

Note that the return is a plain Object, rather than a File object. This is useful if you need to track a File's metadata after you may no longer have access to the File (e.g., the File Input has already been reused).

**`fileto.string(<file>)`** - Unwraps a File object and returns its contents as a JSON string. Literally just a wrapper for `JSON.stringify(fileto.object(<file>))`

```javascript
fileto.string(this.files[0]);
/* '{"name":"test.txt","lastModified":1544812259347,"size":7,"type":"text/plain"}' */
```

**`fileto.callback(<file>, callback, readAs)`** - Unwraps a File Object and executes a callback with its contents.

```javascript
fileto.callback(this.files[0], function(output){
  console.log(output);
});
/* {
  contents: "foobar↵"
  lastModified: 1544812259347
  name: "test.txt"
  size: 7
  type: "text/plain"
} */
```

**`fileto.promise(<file>, readAs)`** - Returns a promise to unwrap a File object, read the file's contents, and resolve the promise with the unwrapped object. The contents will be in `response.contents`.

```javascript
fileto.promise(this.files[0]).then(function(output){
  console.log(output);
});
/* {
  contents: "foobar↵"
  lastModified: 1544812259347
  name: "test.txt"
  size: 7
  type: "text/plain"
} */
```

If Promises aren't available, returns an object with a `then` function that executes a callback as though it were a promise. Note that while this works for an isolated call (like the example above), it does not enable chaining.

By default, `readAs` is `Text`, but [can be set to](https://developer.mozilla.org/en-US/docs/Web/API/FileReader) `ArrayBuffer`, `BinaryString`, `DataURL`, or `Text`.

To see all three of these in action, check out [the demo](https://github.com/CDCgov/fileto/master/demo/index.html).

## Public Domain
This repository constitutes a work of the United States Government and is not
subject to domestic copyright protection under 17 USC § 105. This repository is in
the public domain within the United States, and copyright and related rights in
the work worldwide are waived through the [CC0 1.0 Universal public domain dedication](https://creativecommons.org/publicdomain/zero/1.0/).
All contributions to this repository will be released under the CC0 dedication. By
submitting a pull request you are agreeing to comply with this waiver of
copyright interest.

## License
The repository utilizes code licensed under the terms of the Apache Software
License and therefore is licensed under ASL v2 or later.

This source code in this repository is free: you can redistribute it and/or modify it under
the terms of the Apache Software License version 2, or (at your option) any
later version.

This source code in this repository is distributed in the hope that it will be useful, but WITHOUT ANY
WARRANTY; without even the implied warranty of MERCHANTABILITY or FITNESS FOR A
PARTICULAR PURPOSE. See the Apache Software License for more details.

You should have received a copy of the Apache Software License along with this
program. If not, see http://www.apache.org/licenses/LICENSE-2.0.html

The source code forked from other open source projects will inherit its license.


## Privacy
This repository contains only non-sensitive, publicly available data and
information. All material and community participation is covered by the
Surveillance Platform [Disclaimer](https://github.com/CDCgov/template/blob/master/DISCLAIMER.md)
and [Code of Conduct](https://github.com/CDCgov/template/blob/master/code-of-conduct.md).
For more information about CDC's privacy policy, please visit [http://www.cdc.gov/privacy.html](http://www.cdc.gov/privacy.html).

## Contributing
Anyone is encouraged to contribute to the repository by [forking](https://help.github.com/articles/fork-a-repo)
and submitting a pull request. (If you are new to GitHub, you might start with a
[basic tutorial](https://help.github.com/articles/set-up-git).) By contributing
to this project, you grant a world-wide, royalty-free, perpetual, irrevocable,
non-exclusive, transferable license to all users under the terms of the
[Apache Software License v2](http://www.apache.org/licenses/LICENSE-2.0.html) or
later.

All comments, messages, pull requests, and other submissions received through
CDC including this GitHub page are subject to the [Presidential Records Act](http://www.archives.gov/about/laws/presidential-records.html)
and may be archived. Learn more at [http://www.cdc.gov/other/privacy.html](http://www.cdc.gov/other/privacy.html).

## Records
This repository is not a source of government records, but is a copy to increase
collaboration and collaborative potential. All government records will be
published through the [CDC web site](http://www.cdc.gov).

## Notices
Please refer to [CDC's Template Repository](https://github.com/CDCgov/template)
for more information about [contributing to this repository](https://github.com/CDCgov/template/blob/master/CONTRIBUTING.md),
[public domain notices and disclaimers](https://github.com/CDCgov/template/blob/master/DISCLAIMER.md),
and [code of conduct](https://github.com/CDCgov/template/blob/master/code-of-conduct.md).
