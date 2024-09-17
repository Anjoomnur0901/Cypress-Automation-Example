This folder contains files for testing Aegyris  screening cutpoint and confirming the results.
The folder contains the following files:

1) Configuration files - see Aegyris "Configuration" sidebar link, Cutpoint tab, Plate Level Data Normalization setting.

a) "Configuration S.json" - is for testing of a study where no normalization (user specified) will be performed. Upon plate data entry, you should skip the normalization step.
b) "Configuration SN.json" - is for testing of a study where normalization of type S/N will be performed. You should perform the normalization step for plates.
c) "Configuration LogSN.json" - is for testing of a study where normalization of type Log S/N will be performed. You should perform the normalization step for plates.
d) "Configuration LogS.json" - is for testing of a study where normalization of type Log Transform will be performed. You should perform the normalization step for plates.


2) Import Files folder: contains sample.xslx and control.xlsx files for testing of auto import feature to calculate cutpoints. You should calculate the only screening cutpoint. See User Guide for Details.

3) Manual Import folder: contains plate sample files, id files and label files for adding plate data manually for screening cutpoint calculations. Overview of process for each plate is:
a) select available plate template.
b) import your own ids and choose file
c) import your plate data and choose file.
etc. 
See User Guide for detailed instructions relating to SCP, CCP, and TCP steps.

The auto import will calculate both Parametric and Non Parametric Results - it is expected that the user will do the same for manual import.

Expected Results (both manual and automation should give identical result)
Configuration S        Parametric       Non Parametric
SCP                    +16.987          + 17.651

Configuration SN        Parametric       Non Parametric
SCP                    x 1.191          x 1.188

Configuration LogSN    Parametric       Non Parametric
SCP                    x 1.196          x 1.188

Configuration LogS.json Parametric       Non Parametric
SCP                     x 1.206          x 1.206

