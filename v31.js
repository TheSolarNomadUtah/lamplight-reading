// v31: the old sung clips (s_*) are gone for good. Never request them, whatever the voice or format.
{const lc=loadClip;loadClip=function(name,vv){if(/^s_/.test(name))return Promise.resolve(null);return lc(name,vv)}}
